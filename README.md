# SEKA Shalom Full-Stack Portfolio Platform

Production-ready full-stack portfolio with a password-protected **Admin Dashboard** that lets the admin manage projects, testimonials, certificates, contact messages, the CV, and site identity — all without touching code.

## Stack
- **Frontend:** React 18 + Vite, Tailwind CSS v3, Framer Motion, Recharts
- **Backend:** Express.js v4, MongoDB + Mongoose
- **Auth:** JWT + bcrypt (single admin)
- **Uploads:** Cloudinary (images, certificates, CV)
- **Email:** Nodemailer SMTP (optional)
- **Analytics:** Lightweight anonymous page-view tracking

## Features
- Gamified zigzag project roadmap with status (Finished / In-Progress / Pending)
- Project detail pages, financial metrics, charts, search + filter
- About section, testimonials & certificates sections (all editable)
- **Hire Me form** — project type, "which project", budget, description and file attachment
- Contact form saved to MongoDB (email optional)
- **Admin dashboard** at `/admin`:
  - Overview stats (views, messages, projects, testimonials, certificates)
  - Projects: create / edit / delete + image upload + project type
  - Skills: full CRUD — group, name, level, description, icon (renders on the public page)
  - Testimonials: create / edit / delete + photos
  - Certificates: create / edit / delete + file/image upload
  - Messages inbox: read / mark read / delete / **reply by email**
  - Hire Requests inbox: view, status (New/Contacted/Completed/Archived), open attachment, **reply by email**, delete
  - Site settings: name, title, bio, **about section text/image**, profile photo, education, location, availability, email, socials, domain, CV upload, **View CV** button
  - Stats: projects completed, years of experience, countries served, clients served, users served, transactions — all set by you, no demo data
  - Change admin password

> There is **no demo/seed data**. Everything on the site is real content you add from the admin panel (empty states are shown until you add content).

## Hosting (client & API are deployed SEPARATELY)

This repo is **not** deployed as a single Vercel app anymore. There is **no `vercel.json`** — the client and the API are two independent deployments that talk to each other:

| Part | Folder | Host it as | Start / Build |
|---|---|---|---|
| **Client** (React + Vite static site) | `client/` | Vercel, Netlify, Cloudflare Pages, GitHub Pages… | Build: `npm run build` → output `client/dist` |
| **API** (Express + MongoDB) | `server/` | Render, Railway, Fly.io, a VPS… any long-running Node host | Start: `npm start` (`node server.js`), platform injects `PORT=…` |

### Client (static host)
- Point it at `client/`, framework preset **Vite**, output dir `dist`.
- Set one env var at build time:
  ```
  VITE_API_BASE_URL=https://YOUR-API-HOST/api
  ```
  (If omitted, the app calls same-origin `/api`, which only works via the dev proxy on `localhost`.)

### API (Node host)
- Point it at `server/`, start command `npm start`, add all vars from `server/.env.example`.
- **`CORS_ORIGIN` is mandatory** — comma-separated list of your client URL(s), e.g. `https://yourclient.vercel.app`. Requests from any origin NOT listed will be blocked.
- Health check: `https://YOUR-API-HOST/health`.

## Run locally

### 1. Environment
Copy `server/.env.example` to `server/.env` and fill in the values. Required:

```
MONGODB_URI   # MongoDB Atlas (or local mongodb://127.0.0.1:27017/seka_portfolio)
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
ADMIN_EMAIL   # admin login email (e.g. you@gmail.com)
ADMIN_PASSWORD # admin login password
SMTP_USER / SMTP_PASS  # optional, for email delivery of contact messages
```

> If you use MongoDB Atlas, you MUST allow your current IP in **Network Access** (Database Access → Network Access → Add IP Address → *Allow access from anywhere* `0.0.0.0/0` or your specific IP), otherwise the connection is refused.

### 2. Install & run

Backend:

```bash
cd server
npm install
npm run dev        # port 5000
```

Frontend:

```bash
cd client
npm install
npm run dev        # port 5173
```

Open:

```text
http://localhost:5173
```

### 3. Admin login
Open **http://localhost:5173/admin** (or click "Admin" in the footer).

On first server start, the admin account is created automatically from
`ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.

## API
```text
GET    /api/projects
GET    /api/projects/:slug
GET    /api/projects/status/:status
GET    /api/projects/featured
POST   /api/contact
GET    /api/analytics/views
POST   /api/analytics/view
GET    /api/testimonials
GET    /api/certificates
GET    /api/settings
GET    /api/skills
POST   /api/hire
POST   /api/upload

# Admin (JWT required)
POST   /api/admin/login
GET    /api/admin/me
POST   /api/admin/change-password
POST   /api/admin/upload
POST   /api/admin/projects
PUT    /api/admin/projects/:id
DELETE /api/admin/projects/:id
POST   /api/admin/skills
PUT    /api/admin/skills/:id
DELETE /api/admin/skills/:id
POST   /api/admin/testimonials
PUT    /api/admin/testimonials/:id
DELETE /api/admin/testimonials/:id
POST   /api/admin/certificates
PUT    /api/admin/certificates/:id
DELETE /api/admin/certificates/:id
GET    /api/admin/messages
GET    /api/admin/messages/:id
PATCH  /api/admin/messages/:id/read
POST   /api/admin/messages/:id/reply
DELETE /api/admin/messages/:id
GET    /api/admin/hire
GET    /api/admin/hire/:id
PATCH  /api/admin/hire/:id/read
PATCH  /api/admin/hire/:id/status
POST   /api/admin/hire/:id/reply
DELETE /api/admin/hire/:id
GET    /api/admin/settings
PUT    /api/admin/settings
```

## Admin analytics badge
Open with:

```text
http://localhost:5173?admin=true
```

## Customize
- Upload your CV in Admin → Settings (served at `/cv` and via Download/View CV buttons).
- Upload your profile photo & about image in Admin → Settings.
- Add your skills, projects, testimonials and certificates from the dashboard.
- Change colors in `client/tailwind.config.js`.