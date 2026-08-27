import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("sekaPortfolioToken");
  const adminToken = localStorage.getItem("sekaAdminToken");
  if (config.url && config.url.includes("/admin")) {
    if (adminToken) config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});
api.interceptors.response.use(
  (r) => r,
  (e) =>
    Promise.reject(
      new Error(e.response?.data?.message || e.message || "Network request failed"),
    ),
);

// Projects (public)
export const fetchProjects = async () => {
  const r = await api.get("/projects");
  return r.data.data;
};
export const fetchProjectBySlug = async (slug) => {
  const r = await api.get(`/projects/${slug}`);
  return r.data.data;
};
export const fetchProjectsByStatus = async (status) => {
  const r = await api.get(`/projects/status/${status}`);
  return r.data.data;
};
export const fetchFeaturedProjects = async () => {
  const r = await api.get("/projects/featured");
  return r.data.data;
};

// Contact
export const sendContactMessage = async (payload) => {
  const r = await api.post("/contact", payload);
  return r.data;
};

// Analytics
export const trackPageView = async (payload) => {
  const r = await api.post("/analytics/view", payload);
  return r.data;
};
export const fetchViewStats = async () => {
  const r = await api.get("/analytics/views");
  return r.data.data;
};

// Testimonials & Certificates & Settings (public)
export const fetchTestimonials = async () => {
  const r = await api.get("/testimonials");
  return r.data.data;
};
export const fetchCertificates = async () => {
  const r = await api.get("/certificates");
  return r.data.data;
};
export const fetchSiteSettings = async () => {
  const r = await api.get("/settings");
  return r.data.data;
};
export const fetchSkills = async () => {
  const r = await api.get("/skills");
  return r.data.data;
};

// Hire / project request (public)
export const submitHireRequest = async (payload) => {
  const r = await api.post("/hire", payload);
  return r.data;
};

// Admin auth
export const adminLogin = async (payload) => {
  const r = await api.post("/admin/login", payload);
  return r.data;
};
export const fetchAdmin = async () => {
  const r = await api.get("/admin/me");
  return r.data.data;
};
export const changeAdminPassword = async (payload) => {
  const r = await api.post("/admin/change-password", payload);
  return r.data;
};

// Admin uploads (Cloudinary)
export const uploadAdminFile = async (file, folder) => {
  const fd = new FormData();
  fd.append("file", file);
  if (folder) fd.append("folder", folder);
  const r = await api.post("/admin/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return r.data;
};

// Admin projects
export const createAdminProject = async (payload) => {
  const r = await api.post("/admin/projects", payload);
  return r.data.data;
};
export const updateAdminProject = async (id, payload) => {
  const r = await api.put(`/admin/projects/${id}`, payload);
  return r.data.data;
};
export const deleteAdminProject = async (id) => {
  const r = await api.delete(`/admin/projects/${id}`);
  return r.data;
};

// Admin testimonials
export const createAdminTestimonial = async (payload) => {
  const r = await api.post("/admin/testimonials", payload);
  return r.data.data;
};
export const updateAdminTestimonial = async (id, payload) => {
  const r = await api.put(`/admin/testimonials/${id}`, payload);
  return r.data.data;
};
export const deleteAdminTestimonial = async (id) => {
  const r = await api.delete(`/admin/testimonials/${id}`);
  return r.data;
};

// Admin certificates
export const createAdminCertificate = async (payload) => {
  const r = await api.post("/admin/certificates", payload);
  return r.data.data;
};
export const updateAdminCertificate = async (id, payload) => {
  const r = await api.put(`/admin/certificates/${id}`, payload);
  return r.data.data;
};
export const deleteAdminCertificate = async (id) => {
  const r = await api.delete(`/admin/certificates/${id}`);
  return r.data;
};

// Admin messages
export const fetchMessages = async () => {
  const r = await api.get("/admin/messages");
  return r.data.data;
};
export const fetchMessage = async (id) => {
  const r = await api.get(`/admin/messages/${id}`);
  return r.data.data;
};
export const markMessageRead = async (id) => {
  const r = await api.patch(`/admin/messages/${id}/read`);
  return r.data.data;
};
export const deleteMessage = async (id) => {
  const r = await api.delete(`/admin/messages/${id}`);
  return r.data;
};

// Admin skills
export const createAdminSkill = async (payload) => {
  const r = await api.post("/admin/skills", payload);
  return r.data.data;
};
export const updateAdminSkill = async (id, payload) => {
  const r = await api.put(`/admin/skills/${id}`, payload);
  return r.data.data;
};
export const deleteAdminSkill = async (id) => {
  const r = await api.delete(`/admin/skills/${id}`);
  return r.data;
};

// Admin hire requests
export const fetchHireRequests = async () => {
  const r = await api.get("/admin/hire");
  return r.data.data;
};
export const fetchHireRequest = async (id) => {
  const r = await api.get(`/admin/hire/${id}`);
  return r.data.data;
};
export const markHireRead = async (id) => {
  const r = await api.patch(`/admin/hire/${id}/read`);
  return r.data.data;
};
export const setHireStatus = async (id, status) => {
  const r = await api.patch(`/admin/hire/${id}/status`, { status });
  return r.data.data;
};
export const deleteHireRequest = async (id) => {
  const r = await api.delete(`/admin/hire/${id}`);
  return r.data;
};

// Public upload (Hire Me attachments) — no auth needed
export const uploadPublicFile = async (file, folder) => {
  const fd = new FormData();
  fd.append("file", file);
  if (folder) fd.append("folder", folder);
  const r = await api.post("/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return r.data;
};

// Admin notifications (new message / hire request alerts)
export const fetchNotifications = async () => {
  const r = await api.get("/admin/notifications");
  return r.data; // { success, unread, data }
};
export const markNotificationRead = async (id) => {
  const r = await api.patch(`/admin/notifications/${id}/read`);
  return r.data;
};
export const markAllNotificationsRead = async () => {
  const r = await api.patch("/admin/notifications/read-all");
  return r.data;
};
export const deleteNotification = async (id) => {
  const r = await api.delete(`/admin/notifications/${id}`);
  return r.data;
};

// Admin reply (messages & hire requests) — sends an email via SMTP
export const replyToMessage = async (id, body) => {
  const r = await api.post(`/admin/messages/${id}/reply`, { body });
  return r.data;
};
export const replyToHire = async (id, body) => {
  const r = await api.post(`/admin/hire/${id}/reply`, { body });
  return r.data;
};

// Admin settings
export const updateSiteSettings = async (payload) => {
  const r = await api.put("/admin/settings", payload);
  return r.data.data;
};

export default api;
