# Pastebin Lite

A small Pastebin-like web application that allows users to create text pastes, generate a shareable link, and optionally expire pastes based on time or number of views.

---

## How to Run the App Locally

1. Clone the repository:
```bash
git clone https://github.com/GURUPRASAD9100/pastebin-lite.git
cd pastebin-lite
2.Install dependencies:

npm install
3.Create a .env file in the project root and add:
DATABASE_URL=postgresql://neondb_owner:npg_kvWGmp1LgS2J@ep-blue-dawn-a1djhb6c-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
4.Generate Prisma client:
npx prisma generate
5.Run the development server:
npm run dev
6.Open in browser:
http://localhost:3000

#Persistence Layer Used

PostgreSQL (Neon cloud database)

Prisma ORM is used to interact with the database and manage schema.

This ensures data persists across requests and works correctly in a serverless deployment.




#Important Design Decisions

Used Next.js API routes for backend to keep the app serverless-friendly.

Used Prisma ORM for type-safe and reliable database operations.

Used PostgreSQL (Neon) for persistent storage instead of in-memory storage.

Implemented TTL (time-based expiry) and max-view limits directly in the backend logic.

Generated short unique paste IDs using nanoid for clean URLs.

Added a health check endpoint (/api/healthz) to verify system status.

Ensured Prisma client generation during build for smooth Vercel deployment.
