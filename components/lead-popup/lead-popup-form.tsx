"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Check, ChevronDown, Loader2, MessageCircle } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { budgetOptionIds, serviceOptionIds, whatsappHref } from "@/content/lead-popup";
import { buildEnquiryFieldsSchema, type EnquiryFieldValues } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils";

const SUCCESS_FLASH_MS = 550;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/** Shared focus ring + border treatment for every field — a controlled
 * blue-violet glow rather than the site's usual bright blue, per this
 * pass's contrast/legibility fix. */
const FIELD_FOCUS = "focus:shadow-[0_0_0_3px_rgba(120,110,255,0.12),0_10px_30px_rgba(90,70,220,0.10)]";
// 16px below (not the `text-body` token) at every size, not just mobile: this
// form is reached from a popup that opens on any device, and 16px is the
// floor that keeps iOS Safari from auto-zooming on focus. Documented exception.
const FIELD_BASE = "w-full rounded-2xl border bg-white/[0.055] text-[16px] text-white/[0.94] outline-none backdrop-blur-md transition-[border-color,box-shadow] duration-base placeholder:text-white/48";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
}

/** Shared floating-label field for the free-text inputs. The "floated"
 * state (label shrunk to a caption above the value) is driven by React
 * state — focus or a non-empty value — rather than a CSS `:placeholder-
 * shown` trick, so it composes cleanly with Framer Motion's own animation
 * model instead of fighting it. */
function FloatingField({ id, label, value, onChange, onBlur, error, type = "text", as = "input", required }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const sharedProps = {
    id,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false);
      onBlur?.();
    },
    "aria-invalid": Boolean(error),
    "aria-required": required,
    className: cn(
      "peer px-4 pt-5 pb-2",
      FIELD_BASE,
      FIELD_FOCUS,
      as === "textarea" ? "min-h-[112px] resize-none" : "h-[52px]",
      error ? "border-red-400/60" : "border-white/11 focus:border-[rgba(120,110,255,0.70)]",
    ),
  };

  return (
    <div className="relative flex flex-col">
      {as === "textarea" ? (
        <textarea {...sharedProps} rows={3} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...sharedProps} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4 text-white/48"
        animate={{
          top: floated ? 7 : 15,
          fontSize: floated ? 11 : 14,
          color: focused ? "rgba(120,110,255,0.9)" : "rgba(255,255,255,0.48)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {label}
        {required ? " *" : ""}
      </motion.label>
      <AnimatePresence>
        {error ? (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 overflow-hidden text-[11px] text-red-400"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { id: string; label: string }[];
  error?: string;
}

function SelectField({ id, label, placeholder, value, onChange, onBlur, options, error }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-medium text-white/50">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-[52px] appearance-none px-4",
            FIELD_BASE,
            FIELD_FOCUS,
            value ? "text-white/[0.94]" : "text-white/48",
            error ? "border-red-400/60" : "border-white/11 focus:border-[rgba(120,110,255,0.70)]",
          )}
        >
          <option value="" disabled className="bg-[#12162d] text-white/50">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id} className="bg-[#12162d] text-white">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden />
      </div>
      {error ? (
        <p role="alert" className="text-[11px] text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const defaultValues: EnquiryFieldValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  service: "" as EnquiryFieldValues["service"],
  budget: "" as EnquiryFieldValues["budget"],
};

interface LeadPopupFormProps {
  onSuccess: (values: EnquiryFieldValues) => void;
}

/** The right-side form — floating-label fields, glass selects, a gradient
 * CTA with loading/error/success states, and the trust row + WhatsApp
 * fallback beneath it. Validated with the same Zod schema the API route
 * re-validates against, and submits to `POST /api/enquiries` for real —
 * nothing here is simulated. */
export function LeadPopupForm({ onSuccess }: LeadPopupFormProps) {
  const t = useTranslations("leadPopup");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRenderedAtRef = useRef<number>(undefined);
  const errorBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    formRenderedAtRef.current = Date.now();
  }, []);

  const schema = useMemo(
    () =>
      buildEnquiryFieldsSchema({
        nameError: t("form.name.error"),
        emailError: t("form.email.error"),
        phoneError: t("form.phone.error"),
        serviceError: t("form.service.error"),
        budgetError: t("form.budget.error"),
        messageMinError: t("form.message.minError"),
        messageMaxError: t("form.message.maxError"),
      }),
    [t],
  );

  const { control, handleSubmit, getValues } = useForm<EnquiryFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (status === "error") errorBannerRef.current?.focus();
  }, [status]);

  async function onSubmit(values: EnquiryFieldValues) {
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          honeypot: honeypotRef.current?.value ?? "",
          formRenderedAt: formRenderedAtRef.current ?? Date.now(),
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          locale,
          source: "consultation-popup",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error("submit_failed");

      setStatus("success");
      setTimeout(() => onSuccess(getValues()), SUCCESS_FLASH_MS);
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col p-[18px] sm:p-[22px] md:p-[26px]"
    >
      <span className="glass text-caption inline-flex w-fit items-center gap-1.5 rounded-pill px-3 py-1.5 font-medium text-white/80">
        ✨ {t("badge")}
      </span>
      <h2
        id="lead-popup-heading"
        className="mt-[18px] text-[32px] leading-[1.05] font-semibold text-white text-balance sm:text-[44px]"
      >
        {t("heading.before")} <span className="text-gradient-brand">{t("heading.highlight")}</span>
      </h2>
      <p id="lead-popup-description" className="mt-4 text-[16px] leading-[1.55] text-white/60 text-pretty sm:text-[17px]">
        {t("description")}
      </p>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="mt-[22px] flex flex-col gap-3.5">
        {/* Honeypot — left un-labelled visually and pulled off-screen so
            real (sighted or screen-reader) visitors never encounter it,
            while scripted bots that fill every input they find trip it. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="lead-website">Leave this field empty</label>
          <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingField id="lead-name" label={t("form.name.label")} value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingField id="lead-email" label={t("form.email.label")} type="email" value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingField id="lead-phone" label={t("form.phone.label")} type="tel" value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required />
            )}
          />
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <FloatingField id="lead-company" label={t("form.company.label")} value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <Controller
            name="service"
            control={control}
            render={({ field, fieldState }) => (
              <SelectField
                id="lead-service"
                label={t("form.service.label")}
                placeholder={t("form.service.label")}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                options={serviceOptionIds.map((id) => ({ id, label: t(`form.service.options.${id}`) }))}
              />
            )}
          />
          <Controller
            name="budget"
            control={control}
            render={({ field, fieldState }) => (
              <SelectField
                id="lead-budget"
                label={t("form.budget.label")}
                placeholder={t("form.budget.label")}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                options={budgetOptionIds.map((id) => ({ id, label: t(`form.budget.options.${id}`) }))}
              />
            )}
          />
        </div>

        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <FloatingField id="lead-message" label={t("form.message.label")} as="textarea" value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required />
          )}
        />

        <AnimatePresence>
          {status === "error" ? (
            <motion.div
              ref={errorBannerRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 overflow-hidden rounded-xl border border-red-400/30 bg-red-500/10 px-3.5 py-2.5 text-[13px] text-red-300 outline-none"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{t("error.message")}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Magnetic className="mt-1 w-full">
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            data-cursor="cta"
            whileHover={reduceMotion || status === "submitting" ? undefined : { y: -2 }}
            whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "bg-gradient-brand group relative flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl text-body font-semibold text-white transition-shadow duration-base",
              "shadow-[0_8px_24px_-8px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_28px_-6px_rgba(139,92,246,0.45)]",
              "disabled:opacity-90",
            )}
          >
            <span
              aria-hidden
              className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <AnimatePresence mode="wait" initial={false}>
              {status === "submitting" ? (
                <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  {t("ctaSending")}
                </motion.span>
              ) : status === "success" ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 16 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" aria-hidden />
                </motion.span>
              ) : status === "error" ? (
                <motion.span key="retry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  {t("error.retry")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  {t("cta")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </Magnetic>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 pt-1 pb-5 text-center">
          {(["freeConsultation", "noHiddenCharges", "response24h"] as const).map((id) => (
            <span key={id} className="text-[12px] flex items-center gap-1.5 text-white/55 sm:text-[13px]">
              <span className="text-brand-emerald" aria-hidden>
                ✓
              </span>
              {t(`trust.${id}`)}
            </span>
          ))}
        </div>
      </form>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="glass text-caption mx-auto flex w-fit items-center gap-1.5 rounded-pill px-3.5 py-2 font-medium text-white/70 transition-colors duration-fast hover:text-white"
      >
        <MessageCircle className="text-brand-emerald h-3.5 w-3.5" aria-hidden />
        {t("urgentHelp")}
      </a>
    </motion.div>
  );
}
