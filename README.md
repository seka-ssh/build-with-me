# Seka Shalom Full-Stack Portfolio Platform

This is a downloadable, production-ready full-stack portfolio app based on the provided SEKA SHALOM master specification.

## Included
- React 18 + Vite frontend
- Tailwind CSS v3 design system
- Framer Motion animations
- Zigzag gamified roadmap
- Project modal, charts, filters, and detail pages
- Express.js v4 backend
- MongoDB + Mongoose models
- Contact form saved to MongoDB with Nodemailer support
- Lightweight anonymous analytics
- Docker Compose, Nginx, PM2, GitHub Actions
- Seed script with all 14 projects

## Run locally

Backend:

```bash
cd server
npm install
npm run seed
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Run with Docker

```bash
docker compose up --build
docker compose exec server npm run seed
```

Open:

```text
http://localhost
```

## Environment
Copy `server/.env.example` and edit `server/.env`. SMTP can stay empty for local testing; contact messages still save to MongoDB.

## API
```text
GET    /api/projects
GET    /api/projects/:slug
GET    /api/projects/status/:status
GET    /api/projects/featured
POST   /api/contact
GET    /api/analytics/views
POST   /api/analytics/view
```

## Admin analytics badge
Open with:

```text
http://localhost:5173?admin=true
```

## Customize
- Replace `client/public/cv.pdf` with the real CV.
- Replace project SVG previews inside `client/public/projects/`.
- Change colors in `client/tailwind.config.js`.
- Update data in `server/scripts/seedDatabase.js` and `client/src/data/projects.js`.
