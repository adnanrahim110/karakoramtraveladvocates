"use client";

import React, { useState } from "react";
import { useInteractive } from "@/components/spatial/InteractiveContext";
import { DisciplineLedgerRow } from "@/components/sections/home/service-pillars/DisciplineLedgerRow";
import { DisciplineArchivalPrint } from "@/components/sections/home/service-pillars/DisciplineArchivalPrint";
import type { DisciplineArchiveSummary } from "@/components/sections/home/service-pillars/DisciplineItineraryChip";
import type { ServiceDisciplineConfig } from "@/lib/data/service-disciplines";
import type { ServicePillar } from "@/lib/types/cms";

interface ServicePillarsExplorerProps {
  disciplines: ServiceDisciplineConfig[];
  journeysByPillar: Record<ServicePillar, DisciplineArchiveSummary[]>;
}

/**
 * Light interactive typographic discipline ledger paired with a floating
 * museum-matted photography specimen plate.
 */
export function ServicePillarsExplorer({
  disciplines,
  journeysByPillar,
}: ServicePillarsExplorerProps) {
  const { unit, openInquiry } = useInteractive();
  const [activeKey, setActiveKey] = useState<ServicePillar>("tour");

  const activeDiscipline =
    disciplines.find((d) => d.key === activeKey) ?? disciplines[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Left 7 Columns: Open Typographic Altitude Ledger (Zero Boxes) */}
      <div className="lg:col-span-7 border-t border-midnight-navy/15 flex flex-col">
        {disciplines.map((discipline) => (
          <DisciplineLedgerRow
            key={discipline.key}
            discipline={discipline}
            journeys={journeysByPillar[discipline.key] ?? []}
            isSelected={discipline.key === activeKey}
            unit={unit}
            onSelect={() => setActiveKey(discipline.key)}
            onTailor={() =>
              openInquiry({
                serviceType: discipline.key,
                tripTitle: `Bespoke ${discipline.title} Brief`,
              })
            }
          />
        ))}
      </div>

      {/* Right 5 Columns: Sticky Light Gallery-Matted Print & Milepost Line */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <DisciplineArchivalPrint
          disciplines={disciplines}
          active={activeDiscipline}
          unit={unit}
        />
      </div>
    </div>
  );
}
