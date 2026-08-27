import { useMemo, useState } from "react";
const useProjectFilter = (projects) => {
  const [status, setStatus] = useState("All"),
    [category, setCategory] = useState("All"),
    [search, setSearch] = useState("");
  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (status === "All" || p.status === status) &&
        (category === "All" || p.category === category) &&
        (!q ||
          p.title?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          (p.techStack || []).join(" ").toLowerCase().includes(q)),
    );
  }, [projects, status, category, search]);
  return {
    status,
    setStatus,
    category,
    setCategory,
    search,
    setSearch,
    filteredProjects,
  };
};
export default useProjectFilter;
