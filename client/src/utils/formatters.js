export const formatDate = (d) =>
  !d
    ? "In progress"
    : new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
        new Date(d),
      );
export const compactNumber = (v) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(v);
export const statusLabel = (s) =>
  ({
    Finished: "Finished",
    "In-Progress": "In Progress",
    Pending: "Coming Soon",
  })[s] || s;
export const projectDuration = (s, e) => {
  const a = new Date(s),
    b = e ? new Date(e) : new Date(),
    m = Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24 * 30.4)));
  return `${m} month${m > 1 ? "s" : ""}`;
};
