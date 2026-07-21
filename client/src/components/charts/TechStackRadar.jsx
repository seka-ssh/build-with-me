import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const data = [
  { stack: "React", strength: 96 },
  { stack: "Node", strength: 94 },
  { stack: "MongoDB", strength: 92 },
  { stack: "DevOps", strength: 82 },
  { stack: "Security", strength: 86 },
  { stack: "UX", strength: 88 },
];
const TechStackRadar = () => (
  <div className="h-72 rounded-3xl border border-portfolio-border bg-portfolio-surface/70 p-4">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="#1F2937" />
        <PolarAngleAxis
          dataKey="stack"
          tick={{ fill: "#9CA3AF", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #1F2937",
            borderRadius: "14px",
            color: "#F9FAFB",
          }}
        />
        <Radar
          dataKey="strength"
          stroke="#F59E0B"
          fill="#F59E0B"
          fillOpacity={0.28}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);
export default TechStackRadar;
