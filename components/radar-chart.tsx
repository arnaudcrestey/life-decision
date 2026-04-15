"use client";

import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as Chart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type RadarPoint = {
  subject: string;
  value: number;
};

export function RadarChart({ data }: { data: RadarPoint[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  return (
    <div className="glass-card h-[300px] w-full p-4 sm:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <Chart
          data={data}
          outerRadius="65%"
          margin={
            isMobile
              ? { top: 10, right: 18, bottom: 10, left: 18 }
              : { top: 0, right: 0, bottom: 0, left: 0 }
          }
        >
          <PolarGrid stroke="rgba(255,255,255,0.2)" />

          <PolarAngleAxis
            dataKey="subject"
            tick={({ payload, x, y, textAnchor }) => {
              const label = String(payload.value);

              if (isMobile && label === "Confiance") {
                return (
                  <text
                    x={x - 10}
                    y={y}
                    textAnchor="start"
                    fill="#e2e8f0"
                    fontSize={12}
                  >
                    {label}
                  </text>
                );
              }

              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  fill="#e2e8f0"
                  fontSize={12}
                >
                  {label}
                </text>
              );
            }}
            tickLine={false}
            className="text-xs"
          />

          <Radar
            dataKey="value"
            stroke="#22d3ee"
            fill="#8b5cf6"
            fillOpacity={0.4}
            strokeWidth={2}
            dot={{ fill: "#22d3ee", r: 4 }}
          />

          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px"
            }}
            formatter={(value: number) => [`${value}/3`, "Score"]}
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
