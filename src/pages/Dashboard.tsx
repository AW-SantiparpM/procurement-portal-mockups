import React from "react";
import {
  purchaseRequisitions,
  rfqs,
  supplierResponses,
} from "../data/sampleData";

const Dashboard: React.FC = () => {
  const totalPRs: number = purchaseRequisitions.length;
  const totalRFQs: number = rfqs.length;
  const totalResponses: number = supplierResponses.length;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-2 text-xs">
          <button className="px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            Refresh
          </button>
          <button className="px-3 py-1.5 rounded-md bg-brand-600 text-white hover:bg-brand-700">
            Export Snapshot
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="PRs Imported" value={totalPRs} />
        <StatCard label="RFQs" value={totalRFQs} />
        <StatCard label="Supplier Responses" value={totalResponses} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <ChartCard title="PRs by Status" className="xl:col-span-2">
          <DonutChart data={buildStatusData()} />
        </ChartCard>
        <ChartCard title="RFQs Last 7 Days" className="xl:col-span-3">
          <BarSpark values={mockSeries(7, 3, 12)} />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard title="Response Turnaround (hrs)" className="xl:col-span-1">
          <LineSpark values={mockSeries(12, 4, 24)} />
        </ChartCard>
        <ChartCard title="Avg Prices (Sample)" className="xl:col-span-2">
          <AreaSpark values={mockSeries(20, 10, 30)} />
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;

interface StatCardProps {
  label: string;
  value: number;
}
const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    <div className="text-2xl font-bold mt-1 text-brand-600">{value}</div>
  </div>
);

interface ChartCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
const ChartCard: React.FC<ChartCardProps> = ({
  title,
  className,
  children,
}) => (
  <div
    className={
      "p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col " +
      (className || "")
    }
  >
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-sm">{title}</h3>
      <button className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
        Details
      </button>
    </div>
    <div className="flex-1 flex items-center justify-center min-h-[160px]">
      {children}
    </div>
  </div>
);

// Simple mock chart components (pure SVG)
const DonutChart: React.FC<{
  data: { label: string; value: number; color: string }[];
}> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  return (
    <svg viewBox="0 0 42 42" className="w-40 h-40">
      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gray-200 dark:text-gray-700"
      />
      {data.map((seg, i) => {
        const start = (cumulative / total) * 100;
        cumulative += seg.value;
        const strokeDasharray = `${(seg.value / total) * 100} ${
          100 - (seg.value / total) * 100
        }`;
        const strokeDashoffset = 25 - start;
        return (
          <circle
            key={i}
            cx="21"
            cy="21"
            r="15.915"
            fill="transparent"
            stroke={seg.color}
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        );
      })}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-gray-600 dark:fill-gray-300 text-xs font-semibold"
      >
        {total}
      </text>
    </svg>
  );
};

const BarSpark: React.FC<{ values: number[] }> = ({ values }) => {
  const max = Math.max(...values);
  const w = 220;
  const h = 120;
  const barW = w / values.length - 4;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      {values.map((v, i) => {
        const bh = (v / max) * (h - 20);
        return (
          <rect
            key={i}
            x={i * (barW + 4)}
            y={h - bh}
            width={barW}
            height={bh}
            rx={2}
            className="fill-brand-500/70"
          />
        );
      })}
    </svg>
  );
};

const LineSpark: React.FC<{ values: number[] }> = ({ values }) => {
  const max = Math.max(...values);
  const w = 220;
  const h = 120;
  const pts = values
    .map(
      (v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * (h - 20)}`
    )
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      <polyline
        fill="none"
        stroke="url(#gradLine)"
        strokeWidth={3}
        points={pts}
      />
      <defs>
        <linearGradient id="gradLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2aa7f5" />
          <stop offset="100%" stopColor="#1584d6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const AreaSpark: React.FC<{ values: number[] }> = ({ values }) => {
  const max = Math.max(...values);
  const w = 480;
  const h = 140;
  const coords = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - (v / max) * (h - 30),
  ]);
  const line = coords.map((c) => c.join(",")).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44">
      <polyline points={area} fill="url(#gradArea)" opacity={0.4} />
      <polyline points={line} fill="none" stroke="#2aa7f5" strokeWidth={2} />
      <defs>
        <linearGradient id="gradArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2aa7f5" />
          <stop offset="100%" stopColor="#2aa7f5" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

// helpers
const buildStatusData = () => {
  const statusCounts: Record<string, number> = {};
  purchaseRequisitions.forEach((pr) => {
    statusCounts[pr.status] = (statusCounts[pr.status] || 0) + 1;
  });
  return Object.entries(statusCounts).map(([label, value], i) => ({
    label,
    value,
    color: ["#2aa7f5", "#1584d6", "#1169ad", "#0d324d"][i % 4],
  }));
};
const mockSeries = (len: number, min: number, max: number) =>
  Array.from({ length: len }, () =>
    Math.round(min + Math.random() * (max - min))
  );
