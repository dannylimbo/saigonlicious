"use client";

import { deliveryHours, openingHours } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const dayMap: Record<number, string> = {
  0: "Sonntag",
  1: "Montag",
  2: "Dienstag",
  3: "Mittwoch",
  4: "Donnerstag",
  5: "Freitag",
  6: "Samstag",
};

function isTodayRow(days: string): boolean {
  const today = new Date().getDay();
  const dayName = dayMap[today];

  if (days.includes("Samstag") && days.includes("Sonntag")) {
    return today === 0 || today === 6;
  }

  if (days.includes("Montag") && days.includes("Freitag")) {
    return today >= 1 && today <= 5;
  }

  return days.includes(dayName);
}

type HoursTableProps = {
  title: string;
  rows: readonly { days: string; hours: string }[];
  variant?: "dark" | "rice";
};

function HoursTable({ title, rows, variant = "rice" }: HoursTableProps) {
  const isRice = variant === "rice";

  return (
    <div className={cn("flex-1", isRice ? "card-rice" : "card-dark-glow")}>
      <h3
        className={cn(
          "font-display text-xl tracking-wide",
          isRice ? "text-on-rice-accent" : "text-saigon-green"
        )}
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-1">
        {rows.map((row) => {
          const isToday = isTodayRow(row.days);
          return (
            <li
              key={row.days}
              className={cn(
                "flex flex-wrap justify-between gap-2 rounded-lg px-3 py-2.5",
                isToday &&
                  (isRice
                    ? "card-rice-highlight font-semibold"
                    : "border border-saigon-green/40 bg-saigon-green/10")
              )}
            >
              <span
                className={cn(
                  isRice ? (isToday ? "font-semibold" : "") : "text-white",
                  isToday && !isRice && "font-semibold"
                )}
              >
                {row.days}
                {isToday && (
                  <span
                    className={cn(
                      "ml-2 text-xs font-normal",
                      isRice ? "text-on-rice-accent" : "text-saigon-green"
                    )}
                  >
                    Heute
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "font-medium",
                  isRice
                    ? isToday
                      ? "text-on-rice-accent"
                      : "text-on-rice-muted"
                    : isToday
                      ? "text-saigon-green-light"
                      : "text-muted"
                )}
              >
                {row.hours}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function OpeningHours() {
  return (
    <Section
      id="oeffnungszeiten"
      tone="warm-black"
      pattern="dots"
      glow="center"
      divider
      decor={[
        { icon: "lime", className: "decor-pos-tr" },
        { icon: "orchid", className: "decor-pos-bl", mobile: false },
      ]}
      className="section-padding"
      aria-labelledby="hours-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="hours-heading"
            accent
            brushStroke
            title="Wann haben wir geöffnet?"
            subtitle="Öffnungs- und Lieferzeiten auf einen Blick."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-col gap-6 lg:flex-row">
            <HoursTable title="Öffnungszeiten" rows={openingHours} variant="rice" />
            <HoursTable title="Lieferzeiten" rows={deliveryHours} variant="rice" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
