
# 🎒 Lost & Found Portal

Losing your ID card, water bottle, or umbrella on campus usually means asking around in five different WhatsApp groups and hoping for the best. **Lost & Found Portal** replaces that chaos with a proper system — a multi-tenant web app where colleges can independently manage lost item reports, found item reports, and the claiming process, all under one platform.

Each institution gets its own isolated space: its own students, admins, locations, and reports — without needing a separate deployment per college.

**🌐 Live Demo:** [lost-and-found-web-mu.vercel.app](https://lost-and-found-web-mu.vercel.app/)

---

## ✨ Features

- 🏫 **Multi-college architecture** — one platform, many independent institutions
- 🔐 **Secure authentication** with JWT and hashed passwords
- 🛡️ **Role-based authorization** — separate permissions for students and admins
- 📢 **Lost item reporting** with images, location, and description
- 📦 **Found item reporting** to log recovered items
- 🤝 **Claiming workflow** to match found items back to their owners
- 📊 **College-specific dashboards** scoped to each institution's data
- 🧑‍💼 **Admin panel** for managing reports and users
- 👤 **User profile management**
- 🖼️ **Image upload support** for item photos
- 📱 **Responsive interface** across devices

---

## 🎮 Try It Yourself — Demo Access

No need to register — log in with these demo accounts to explore both sides of the platform.

| Role | College | Email | Password |
|------|---------|-------|----------|
| 🧑‍🎓 Student | Softwarica College | `demo.student@example.com` | `Demo@123` |
| 🧑‍💼 Admin | Softwarica College | `demo.admin@example.com` | `Demo@123` |

> These accounts exist purely for demonstration. Please don't change their passwords or delete their data — other visitors are using them too.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, React Router, Axios, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL, Sequelize ORM |
| **Auth & Security** | JSON Web Token (JWT), bcrypt |
| **File Upload & Storage** | Multer (local storage) |
| **Deployment** | Vercel (frontend), Render (backend + database) |

---

## 📁 Project Structure

```
lostandfound/
├── backend/
│   ├── controllers/     # Request handling & business logic
│   ├── middlewares/     # Auth guards, role checks, error handling
│   ├── models/          # Sequelize models (Users, College, Item, Claim, Location)
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper scripts (e.g. DB seeding)
│   ├── uploads/         # Local image uploads 
│   ├── db.js            # Sequelize/Postgres connection
│   └── index.js         # App entry point
│
└── lostandfound/         # React frontend
    ├── public/
    └── src/
        ├── assets/          # Images, icons, static files
        ├── components/      # Reusable UI components
        ├── context/         # React context providers (e.g. auth state)
        ├── hooks/           # Custom hooks (e.g. apiRequest)
        ├── pages/           # Route-level page components
        ├── routes/          # Route definitions / protected routes
        ├── schema/          # Form validation schemas
        ├── utils/           # Helper functions
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/mrxstm/lost_and_found-web-.git
```

### Backend setup

```bash
cd backend
npm install
npm start
```

Runs on `http://localhost:5000` by default.

### Frontend setup

```bash
cd lostandfound
npm install
npm run dev
```

Runs on `http://localhost:5173` by default — open it in your browser to use the app locally.

---

## 🔑 Environment Variables

**Backend** (`backend/.env`)

```env
DATABASE_URL=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

**Frontend** (`lostandfound/.env`)

```env
VITE_API_URL=
```

---

## 🗺️ Roadmap

- **🤖 AI-powered item matching** — automatically compare new lost/found reports using images, descriptions, location, and category to suggest likely matches instead of relying on manual browsing.
- **🏫 College self-registration** — let institutions onboard themselves through the platform rather than requiring manual database entry.
- **🔔 Email & push notifications** — alert users when a potential match appears or their report's status changes.

---

## 👨‍💻 Author

**Satyam Shrestha**
GitHub: [@mrxstm](https://github.com/mrxstm)
