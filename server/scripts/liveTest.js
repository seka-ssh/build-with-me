/* Verify all server modules load without syntax/reference errors */
const mods = [
  "../models/SiteSettings",
  "../controllers/siteController",
  "../controllers/skillController",
  "../controllers/hireController",
  "../controllers/messageController",
  "../controllers/notificationController",
  "../controllers/contactController",
  "../controllers/adminController",
  "../controllers/testimonialController",
  "../controllers/certificateController",
  "../controllers/uploadController",
  "../routes/adminRoutes",
  "../routes/publicRoutes",
  "../routes/contactRoutes",
  "../middleware/rateLimiter",
  "../middleware/upload",
  "../utils/emailService",
  "../utils/notify",
];
let ok = true;
for (const m of [...new Set(mods)]) {
  try {
    require(m);
    console.log("OK  " + m);
  } catch (e) {
    ok = false;
    console.log("ERR " + m + " -> " + e.message);
  }
}
process.exit(ok ? 0 : 1);

const BASE = "http://localhost:5000/api";
const get = async (path) => {
  const r = await fetch(`${BASE}${path}`);
  const j = await r.json().catch(() => ({}));
  return { status: r.status, j };
};
const post = async (path, body, token) => {
  const r = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  return { status: r.status, j };
};
(async () => {
  const results = [];
  const log = (name, ok, extra = "") =>
    results.push(`${ok ? "PASS" : "FAIL"} ${name}${extra ? " -> " + extra : ""}`);

  const s = await get("/settings");
  log("GET /settings", s.status === 200 && s.j?.data?.name, `name=${s.j?.data?.name} phone=${s.j?.data?.phonePrimary}`);

  const p = await get("/projects");
  log("GET /projects", p.status === 200 && Array.isArray(p.j?.data), `count=${p.j?.data?.length}`);

  const k = await get("/skills");
  log("GET /skills", k.status === 200 && Array.isArray(k.j?.data), `count=${k.j?.data?.length}`);

  const t = await get("/testimonials");
  log("GET /testimonials", t.status === 200 && Array.isArray(t.j?.data), `count=${t.j?.data?.length}`);

  const n = await get("/admin/notifications");
  log("GET /admin/notifications (no token)", n.status === 401 || n.status === 403, `status=${n.status}`);

  const creds = { email: "sekashalom74@gmail.com", password: "mutuyimana@@@123" };
  const login = await post("/admin/login", creds);
  const token = login.j?.data?.token || login.j?.token;
  log("POST /admin/login", Boolean(token), token ? "JWT received" : `status=${login.status}`);

  if (token) {
    const n2 = await fetch(`${BASE}/admin/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const n2j = await n2.json().catch(() => ({}));
    log("GET /admin/notifications (with token)", n2.status === 200, `status=${n2.status} unread=${n2j?.data?.unread ?? 0}`);
  }

  console.log("=== LIVE API TEST RESULTS ===");
  results.forEach((r) => console.log(r));
  const fails = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(`=== SUMMARY: ${results.length - fails}/${results.length} passed ===`);
  process.exit(0);
})().catch((e) => {
  console.error("TEST_RUNNER_ERROR:", e.message);
  process.exit(1);
});



