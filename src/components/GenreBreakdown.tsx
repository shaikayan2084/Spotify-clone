"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { GenreData } from "@/lib/types";

const COLORS = [
  "#1DB954", "#169c46", "#E91E63", "#FF5722", "#FFC107",
  "#2196F3", "#9C27B0", "#00BCD4", "#4CAF50", "#FF9800",
];

interface GenreBreakdownProps {
  genres: GenreData[];
}

export default function GenreBreakdown({ genres }: GenreBreakdownProps) {
  if (!genres.length) {
    return (
      <div className="text-zinc-500 text-center py-12">
        No genre data available.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Genre Breakdown</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genres.slice(0, 8)}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {genres.slice(0, 8).map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {genres.slice(0, 8).map((genre, i) => (
            <div key={genre.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-sm text-zinc-300 flex-1">{genre.name}</span>
              <span className="text-sm font-medium text-white">{genre.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
