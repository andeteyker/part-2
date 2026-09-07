export type GrowthCategory = "Finanzen & Steuern" | "Energie & Umwelt" | "Gesundheit & Fitness" | "Familie & Leben" | "Arbeitgeber & Business";

export type GrowthField = {
  key: string;
  label: string;
  defaultValue: string;
  suffix?: string;
  type?: "number" | "date";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
};

export type GrowthToolConfig = {
  tool: {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    short: string;
    category: GrowthCategory;
    icon: string;
    keywords: string[];
    faq: { question: string; answer: string }[];
  };
  fields: GrowthField[];
  seo: {
    steps: { title: string; text: string }[];
    formula: string;
    example: string;
    relatedSlugs: string[];
  };
  notice: string;
};
