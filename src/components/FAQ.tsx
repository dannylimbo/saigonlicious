"use client";

import { useState } from "react";
import { faqItems } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      tone="charcoal-light"
      pattern="paper"
      glow="headline"
      divider
      decor={[{ icon: "chili", className: "decor-pos-tr", mobile: false }]}
      className="section-padding"
      aria-labelledby="faq-heading"
    >
      <div className="container-narrow max-w-3xl">
        <Reveal>
          <SectionHeading
            id="faq-heading"
            accent
            brushStroke
            title="Häufige Fragen"
            subtitle="Bestellung, Lieferung und Standort – kurz beantwortet."
            align="center"
          />
        </Reveal>

        <div className="border-t border-white/10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 60}>
                <div className="border-b border-white/10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-white">{item.question}</span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center text-xl font-light text-saigon-green"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="prose-muted pb-5 text-muted">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
