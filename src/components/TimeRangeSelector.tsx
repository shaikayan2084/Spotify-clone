"use client";

import { TimeRangeOption } from "@/lib/types";

const timeRanges: TimeRangeOption[] = [
  { label: "4 Weeks", value: "short_term" },
  { label: "6 Months", value: "medium_term" },
  { label: "All Time", value: "long_term" },
];

interface TimeRangeSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

export default function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
      {timeRanges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            selected === range.value
              ? "bg-green-500 text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
