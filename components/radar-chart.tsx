'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as Chart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

type RadarPoint = {
  subject: string;
  value: number;
};

export function RadarChart({ data }: { data: RadarPoint[] }) {
  return (
    <div className="glass-card h-[300px] w-full p-4 sm:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data} outerRadius="65%">
          <PolarGrid stroke="rgba(255,255,255,0.2)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#e2e8f0', fontSize: 12 }}
            tickLine={false}
            className="text-xs"
          />
          <Radar
            dataKey="value"
            stroke="#22d3ee"
            fill="#8b5cf6"
            fillOpacity={0.4}
            strokeWidth={2}
            dot={{ fill: '#22d3ee', r: 4 }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px'
            }}
            formatter={(value: number) => [`${value}/3`, 'Score']}
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
