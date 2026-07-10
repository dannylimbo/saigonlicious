"use client";

import { deliveryHours, openingHours } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { Reveal } from "@/components/ui/Reveal";
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
};

function HoursTable({ title, rows }: HoursTableProps) {
  return (
    <div className="card-dark flex-1">
      <h3 className="font-display text-xl tracking-wide text-saigon-green">{title}</h3>
      <ul className="mt-4 space-y-1">
        {rows.map((row) => {
          const isToday = isTodayRow(row.days);
          return (
            <li
              key={row.days}
              className={cn(
                "flex flex-wrap justify-between gap-2 rounded-lg px-3 py-2.5",
                isToday && "border border-saigon-green/40 bg-saigon-green/10"
              )}
            >
              <span className={cn("text-white", isToday && "font-semibold")}>
                {row.days}
                {isToday && (
                  <span className="ml-2 text-xs font-normal text-saigon-green">
                    Heute
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "font-medium",
                  isToday ? "text-saigon-green-light" : "text-muted"
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
    <section
      id="oeffnungszeiten"
      className="section-padding bg-charcoal"
      aria-labelledby="hours-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="hours-heading"
            accent
            title="Wann haben wir geöffnet?"
            subtitle="Öffnungs- und Lieferzeiten auf einen Blick."
          />
        </Reveal>

        <Reveal delay={80}>
        <div className="flex flex-col gap-6 lg:flex-row">
          <HoursTable title="Öffnungszeiten" rows={openingHours} />
          <HoursTable title="Lieferzeiten" rows={deliveryHours} />
        </div>
        </Reveal>

        <p className="mt-6 text-center text-xs text-muted/70">
          Öffnungszeiten und Lieferzeiten vor Veröffentlichung prüfen.
        </p>
      </div>
    </section>
  );
}
