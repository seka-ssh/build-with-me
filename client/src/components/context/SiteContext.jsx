import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchSiteSettings,
  fetchTestimonials,
  fetchCertificates,
  fetchSkills,
} from "../../services/api";
const SiteContext = createContext(null);
const defaults = {
  name: "SEKA Shalom",
  title: "Full-Stack Engineer",
  bio: "",
  profileImage: "",
  aboutTitle: "",
  aboutText: "",
  education: "",
  location: "",
  aboutImage: "",
  email: "",
  phonePrimary: "",
  phoneSecondary: "",
  github: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  cvUrl: "",
  domain: "",
  projectsCount: 0,
  yearsExperience: 0,
  countriesServed: 0,
  clientsServed: 0,
  usersServed: "",
  transactions: "",
  uptime: "",
  availability: "Available for work",
  announcementText: "",
  announcementLink: "",
  announcementActive: false,
};
export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaults);
  const [testimonials, setTestimonials] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    Promise.allSettled([
      fetchSiteSettings(),
      fetchTestimonials(),
      fetchCertificates(),
      fetchSkills(),
    ]).then(([s, t, c, k]) => {
      if (!ok) return;
      if (s.status === "fulfilled" && s.value)
        setSettings((prev) => ({ ...prev, ...s.value }));
      if (t.status === "fulfilled" && Array.isArray(t.value))
        setTestimonials(t.value);
      if (c.status === "fulfilled" && Array.isArray(c.value))
        setCertificates(c.value);
      if (k.status === "fulfilled" && Array.isArray(k.value)) setSkills(k.value);
      setLoading(false);
    });
    return () => {
      ok = false;
    };
  }, []);

  const value = useMemo(
    () => ({ settings, testimonials, certificates, skills, loading }),
    [settings, testimonials, certificates, skills, loading],
  );
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
export const useSite = () => {
  const c = useContext(SiteContext);
  if (!c) throw new Error("useSite must be used inside SiteProvider");
  return c;
};