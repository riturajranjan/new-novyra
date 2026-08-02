/** Which side of the compact AI Orb + Side Cards selector each need option
 * renders on — keyed by id, not array order, so the visual arrangement in
 * solution-selector.tsx can differ from content/solution-advisor.ts's order
 * without touching that file. */
export const LEFT_NEED_IDS = ["business-website", "saas-product", "crm", "branding"] as const;
export const RIGHT_NEED_IDS = ["ecommerce", "hospital-software", "school-erp", "digital-marketing"] as const;
