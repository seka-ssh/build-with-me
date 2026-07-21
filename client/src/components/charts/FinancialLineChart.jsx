import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = (p) => [
  {
    label: "Q1",
    value: Math.max(8, Math.round((p.completionPercentage || 20) * 0.38)),
  },
  {
    label: "Q2",
    value: Math.max(18, Math.round((p.completionPercentage || 20) * 0.56)),
  },
  {
    label: "Q3",
    value: Math.max(30, Math.round((p.completionPercentage || 20) * 0.78)),
  },
  {
    label: "Q4",
    value: Math.max(48, Math.round(p.completionPercentage || 20)),
  },
];
const FinancialLineChart = ({ project }) => (
  <div>
    <div className="mb-4 flex items-center justify-between gap-4">
      <h3 className="font-display text-lg font-semibold text-portfolio-text">
        Delivery Momentum
      </h3>
      <span className="rounded-full border border-portfolio-border px-3 py-1 text-xs text-portfolio-subtext">
        {project.category}
      </span>
    </div>
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data(project)}
          margin={{ top: 8, right: 12, bottom: 0, left: -18 }}
        >
          <XAxis
            dataKey="label"
            stroke="#6B7280"
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#6B7280" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid #1F2937",
              borderRadius: "14px",
              color: "#F9FAFB",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={{ r: 4, fill: "#F59E0B" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default FinancialLineChart;
