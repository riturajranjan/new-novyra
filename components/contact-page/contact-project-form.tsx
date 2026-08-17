"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Check, ChevronDown, Loader2, MessageCircle } from "lucide-react";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { budgetOptionIds } from "@/content/lead-popup";
import { projectTypeOptionIds } from "@/content/contact-page";
import { companyInfo } from "@/content/footer";
import { buildEnquiryFieldsSchema, type EnquiryFieldValues } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const FIELD_FOCUS = "focus:shadow-[0_0_0_3px_rgba(120,110,255,0.14)]";
const FIELD_BASE =
  "w-full rounded-xl border bg-white/[0.025] text-[15px] text-white/[0.94] outline-none transition-[border-color,box-shadow] duration-base placeholder:text-white/35";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({ id, label, value, onChange, onBlur, error, type = "text", as = "input", placeholder, required, autoComplete }: FieldProps) {
  const shared = {
    id,
    value,
    onBlur,
    "aria-invalid": Boolean(error),
    "aria-required": required,
    autoComplete,
    placeholder,
    className: cn(
      "px-3.5",
      FIELD_BASE,
      FIELD_FOCUS,
      as === "textarea" ? "min-h-[118px] resize-none py-3" : "h-[50px]",
      error ? "border-red-400/60" : "border-white/8 focus:border-[rgba(120,110,255,0.7)]",
    ),
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-medium text-white/50">
        {label}
        {required ? " *" : ""}
      </label>
      {as === "textarea" ? (
        <textarea {...shared} rows={3} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
      {error ? (
        <p role="alert" className="text-[11px] text-red-400">
          {error}
        </p>
      ) : null}
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
  required?: boolean;
}

function SelectField({ id, label, placeholder, value, onChange, onBlur, options, error, required }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-medium text-white/50">
        {label}
        {required ? " *" : ""}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-required={required}
          className={cn(
            "h-[50px] appearance-none px-3.5",
            FIELD_BASE,
            FIELD_FOCUS,
            value ? "text-white/[0.94]" : "text-white/35",
            error ? "border-red-400/60" : "border-white/8 focus:border-[rgba(120,110,255,0.7)]",
          )}
        >
          <option value="" disabled className="bg-[#0c1024] text-white/50">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id} className="bg-[#0c1024] text-white">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
      </div>
      {error ? (
        <p role="alert" className="text-[11px] text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** `budget` is pre-filled (not left blank) — the shared enquiry schema
 * still requires a real value even though this form doesn't mark the
 * field with an asterisk, so a visitor who never touches the dropdown
 * still submits successfully with a sensible starting tier rather than
 * hitting a validation error on a field the UI implies is optional. */
const defaultValues: EnquiryFieldValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  service: "" as EnquiryFieldValues["service"],
  budget: budgetOptionIds[0],
};

/** The Contact page's own project form — same validated-and-real
 * submission path as the lead popup (shared `buildEnquiryFieldsSchema`,
 * `POST /api/enquiries`, honeypot + timing anti-spam), different field
 * order/copy/sizing and a persistent success panel instead of a flash
 * before auto-closing (there's no modal to close here). */
export function ContactProjectForm() {
  const t = useTranslations("contact.workspace.form");
  const tPopup = useTranslations("leadPopup.form");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRenderedAtRef = useRef<number>(undefined);
  const errorBannerRef = useRef<HTMLDivElement>(null);
  const whatsappHref = companyInfo.whatsapp;

  useEffect(() => {
    formRenderedAtRef.current = Date.now();
  }, []);

  const schema = useMemo(
    () =>
      buildEnquiryFieldsSchema({
        nameError: t("name.error"),
        emailError: t("email.error"),
        phoneError: t("phone.error"),
        serviceError: t("projectType.error"),
        budgetError: tPopup("budget.error"),
        messageMinError: t("message.minError"),
        messageMaxError: t("message.maxError"),
      }),
    [t, tPopup],
  );

  const { control, handleSubmit } = useForm<EnquiryFieldValues>({
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
          budget: values.budget || undefined,
          honeypot: honeypotRef.current?.value ?? "",
          formRenderedAt: formRenderedAtRef.current ?? Date.now(),
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          locale,
          source: "contact-page",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error("submit_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex min-h-100 flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <span className="bg-brand-emerald/15 flex h-14 w-14 items-center justify-center rounded-full">
          <Check className="text-brand-emerald h-6 w-6" aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-title-lg text-foreground font-semibold">{t("success.title")}</h3>
          <p className="text-body-sm text-foreground-secondary max-w-90">{t("success.description")}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <RippleLink href="/" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
            {t("success.backHome")}
          </RippleLink>
          <RippleLink href={whatsappHref} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "gradient", size: "md" }))}>
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t("success.whatsapp")}
          </RippleLink>
        </div>
      </motion.div>
    );
  }

  return (
    <div id="project-form" className="scroll-mt-24">
      <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
        <span className="h-px w-6 bg-white/25" aria-hidden />
        {t("eyebrow")}
      </span>
      <h2 className="text-foreground mt-3 font-semibold text-balance" style={{ fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
        {t("heading")}
      </h2>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="mt-6 flex flex-col gap-4">
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field id="contact-name" label={t("name.label")} value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required autoComplete="name" />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field id="contact-email" label={t("email.label")} type="email" value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required autoComplete="email" />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field id="contact-phone" label={t("phone.label")} type="tel" value={field.value} onChange={field.onChange} onBlur={field.onBlur} error={fieldState.error?.message} required autoComplete="tel" />
            )}
          />
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Field id="contact-company" label={t("company.label")} value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} autoComplete="organization" />
            )}
          />
        </div>

        <Controller
          name="service"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              id="contact-project-type"
              label={t("projectType.label")}
              placeholder={t("projectType.label")}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              required
              options={projectTypeOptionIds.map((id) => ({ id, label: tPopup(`service.options.${id}`) }))}
            />
          )}
        />

        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <SelectField
              id="contact-budget"
              label={t("budget.label")}
              placeholder={t("budget.label")}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={budgetOptionIds.map((id) => ({ id, label: tPopup(`budget.options.${id}`) }))}
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              id="contact-message"
              label={t("message.label")}
              as="textarea"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder={t("message.placeholder")}
              required
            />
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

        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={reduceMotion || status === "submitting" ? undefined : { y: -2 }}
          whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "bg-gradient-brand group relative flex h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-body-sm font-semibold text-white transition-shadow duration-base",
            "shadow-[0_8px_24px_-8px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_28px_-6px_rgba(139,92,246,0.45)]",
            "disabled:opacity-90",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "submitting" ? (
              <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t("submitting")}
              </motion.span>
            ) : status === "error" ? (
              <motion.span key="retry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                {t("error.retry")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
              </motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                {t("submitCta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <p className="text-caption text-center text-white/40">{t("trustNote")}</p>
      </form>
    </div>
  );
}
