<p align="center">
  <img src="client/public/brand-mark.svg" alt="Smart Leads custom symbol" width="96" height="96" />
</p>

# Smart Leads Dashboard

A full-stack lead management dashboard for sales teams. Users can register, sign in, manage leads, filter and search records, paginate server-side results, export visible lead data to CSV, and use role-aware controls for admin and sales users.

## Project Symbol

The custom Smart Leads symbol combines a lead funnel, a rising conversion path, and a verified lead node. It is used as the browser favicon, in-app brand mark, and README identity asset.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript 6, Vite 8, TailwindCSS 3 |
| Backend | Node 20, Express 5, TypeScript 6 |
| Database | MongoDB 7, Mongoose 9 |
| Auth | JWT, bcryptjs |
| Tooling | ESLint, Docker, Docker Compose, nginx |

## Prerequisites

- Node.js 20+
- npm
- Docker Desktop for Docker setup
- MongoDB for local non-Docker development

## Setup: Docker Recommended

```bash
cp .env.example .env
# Edit JWT_SECRET before production-like use
docker-compose up --build
```

Open `http://localhost:3000`.

Docker services:
- Client: `http://localhost:3000`
- Server: `http://localhost:5000`
- Health check: `http://localhost:5000/health`
- MongoDB: `localhost:27017`

## Setup: Local Development

Terminal 1:

```bash
mongod
```

Terminal 2:

```bash
cd server
npm install
npm run dev
```

Terminal 3:

```bash
cd client
npm install
npm run dev
```

Local env files are ignored by git:
- `server/.env`
- `client/.env`

## Environment Variables

Root `.env.example` documents all required variables:

```bash
PORT=5000
MONGO_URI=mongodb://mongo:27017/smart-leads
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:5000/api
```

For local server development, use `MONGO_URI=mongodb://localhost:27017/smart-leads`.

## Credentials

There are no default seeded credentials. Create users from the Register page:
- Choose `Admin` for full CRUD access, including delete.
- Choose `Sales User` for create/view/update access. Sales users cannot delete leads and can only edit their own leads.

## API Documentation

| Method | Path | Auth | Role |
|---|---|---|---|
| GET | `/health` | No | Public |
| POST | `/api/auth/register` | No | Public |
| POST | `/api/auth/login` | No | Public |
| GET | `/api/auth/me` | Yes | Any |
| GET | `/api/auth/admin-check` | Yes | Admin |
| GET | `/api/leads` | Yes | Any |
| POST | `/api/leads` | Yes | Any |
| GET | `/api/leads/:id` | Yes | Owner or Admin |
| PUT | `/api/leads/:id` | Yes | Owner or Admin |
| DELETE | `/api/leads/:id` | Yes | Admin |

Lead list query params:

| Param | Values | Default |
|---|---|---|
| `status` | `New`, `Contacted`, `Qualified`, `Lost` | none |
| `source` | `Website`, `Instagram`, `Referral` | none |
| `search` | name or email text | none |
| `sort` | `latest`, `oldest` | `latest` |
| `page` | number >= 1 | `1` |
| `limit` | 1-50 | `10` |

## Features

- TypeScript across frontend and backend
- JWT authentication
- bcrypt password hashing
- Role-based access control for admin and sales users
- Lead CRUD API
- Server-side filtering, search, sorting, and pagination
- Debounced frontend search
- Responsive leads dashboard
- Create/edit modal with validation
- Loading, empty, and error states
- Client-side CSV export for the current filtered page
- Dark mode toggle with persistence
- Docker setup for client, server, and MongoDB

## Quality Checks

Run before submission:

```bash
cd server
npx tsc --noEmit
npm run lint
npm run build
```

```bash
cd client
npx tsc --noEmit -p tsconfig.app.json
npm run lint
npm run build
```
