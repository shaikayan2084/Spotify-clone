"use client";

import { useMemo } from "react";
import { HeatmapData } from "@/lib/types";

interface ListeningHeatmapProps {
  data: HeatmapData[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function getIntensity(value: number, max: number): string {
  if (max === 0) return "bg-zinc-800";
  const ratio = value / max;
  if (ratio === 0) return "bg-zinc-800";
  if (ratio <= 0.25) return "bg-green-900/60";
  if (ratio <= 0.5) return "bg-green-700/60";
  if (ratio <= 0.75) return "bg-green-500/60";
  return "bg-green-400/80";
}

export default function ListeningHeatmap({ data }: ListeningHeatmapProps) {
  const maxValue = useMemo(
    () => Math.max(...data.map((d) => d.value), 1),
    [data]
  );

  const getValue = (day: number, hour: number) => {
    const item = data.find((d) => d.day === day && d.hour === hour);
    return item?.value || 0;
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Listening Heatmap</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          <div className="w-8" />
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="w-5 flex-shrink-0 text-[8px] text-zinc-600 text-center"
            >
              {hour}
            </div>
          ))}
        </div>
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="flex gap-1 mt-1">
            <div className="w-8 text-[10px] text-zinc-500 leading-5">{day}</div>
            {HOURS.map((hour) => (
              <div
                key={hour}
                className={`w-5 h-5 rounded-sm ${getIntensity(
                  getValue(dayIndex, hour),
                  maxValue
                )}`}
                title={`${day} ${hour}:00 - ${getValue(dayIndex, hour)} plays`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-zinc-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-zinc-800" />
        <div className="w-3 h-3 rounded-sm bg-green-900/60" />
        <div className="w-3 h-3 rounded-sm bg-green-700/60" />
        <div className="w-3 h-3 rounded-sm bg-green-500/60" />
        <div className="w-3 h-3 rounded-sm bg-green-400/80" />
        <span>More</span>
      </div>
    </div>
  );
}
