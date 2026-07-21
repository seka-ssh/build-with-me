import { CheckCircle2, Clock3, Lock } from "lucide-react";
import { statusLabel } from "../../utils/formatters";
const styles = {
  Finished:
    "border-portfolio-success/50 bg-portfolio-success/10 text-portfolio-success",
  "In-Progress":
    "border-portfolio-amber/50 bg-portfolio-amber/10 text-portfolio-gold-light",
  Pending:
    "border-portfolio-muted/50 bg-portfolio-muted/10 text-portfolio-subtext",
};
const icons = { Finished: CheckCircle2, "In-Progress": Clock3, Pending: Lock };
const StatusBadge = ({ status }) => {
  const Icon = icons[status] || Clock3;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles[status]}`}
    >
      <Icon size={14} />
      {statusLabel(status)}
    </span>
  );
};
export default StatusBadge;
