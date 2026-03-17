# 🕋 Umrah Companion

> Your complete full-stack web application for Umrah preparation — built with React, Node.js, MongoDB and deployed as a PWA.

![Umrah Companion](https://img.shields.io/badge/Umrah-Companion-1B4332?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)

---

## 🌐 Live Demo

| Service         | URL                                            |
| --------------- | ---------------------------------------------- |
| **Frontend**    | https://umrah-app-mocha.vercel.app             |
| **Backend API** | https://umrah-app-5ffq.onrender.com/api/health |

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Forgot password via email
- Reset password with secure token
- Password strength meter

### 🕋 Umrah Checklist

- 10 step-by-step Umrah tasks
- Niat Ihram → Tawaf → Saie → Tahallul and more
- Animated checkboxes with progress tracking
- Saves progress per user to database
- Reset checklist anytime

### 🎒 Packing Checklist

- 28 essential items across 5 categories
- Categories: Ihram, Documents, Clothing, Medicine, Toiletries
- Per-category progress bars
- Filter by category
- Collapsible category sections

### 👤 Profile

- View and edit profile details
- Set Umrah date for countdown timer
- Change password securely
- Progress overview

### 📊 Dashboard

- Personalized welcome with Islamic greeting
- Countdown timer to Umrah date
- Real-time progress cards
- Quick access navigation
- Daily Quran verse reminder

### 📱 PWA Support

- Installable on mobile as a native app
- Offline caching with service worker
- Add to Home Screen support
- Mobile-first responsive design

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| React 18 + Vite  | UI framework and build tool   |
| TailwindCSS      | Utility-first styling         |
| Framer Motion    | Smooth animations             |
| React Router DOM | Client-side routing           |
| React Hook Form  | Form handling and validation  |
| Axios            | HTTP client with interceptors |
| React Hot Toast  | Toast notifications           |
| vite-plugin-pwa  | PWA support                   |

### Backend

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| Node.js + Express | REST API server          |
| MongoDB Atlas     | Cloud database           |
| Mongoose          | MongoDB object modeling  |
| JWT               | Stateless authentication |
| bcryptjs          | Password hashing         |
| Nodemailer        | Email sending            |
| crypto            | Secure token generation  |

### Deployment

| Service       | Purpose                 |
| ------------- | ----------------------- |
| Vercel        | Frontend hosting + CDN  |
| Render        | Backend hosting         |
| MongoDB Atlas | Database hosting        |
| GitHub        | Version control + CI/CD |

---

## 📁 Project Structure

```
umrah-app/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   ├── checklistController.js # Checklist logic
│   │   └── userController.js      # Profile logic
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Checklist.js           # Checklist schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   ├── checklistRoutes.js     # /api/checklist/*
│   │   └── userRoutes.js          # /api/user/*
│   ├── utils/
│   │   ├── defaultChecklist.js    # Default checklist data
│   │   ├── emailTemplates.js      # HTML email templates
│   │   ├── generateToken.js       # JWT generator
│   │   └── sendEmail.js           # Nodemailer helper
│   ├── .env.example               # Environment variables template
│   └── server.js                  # Express entry point
│
└── frontend/
    ├── public/
    │   └── icons/                 # PWA icons
    └── src/
        ├── api/
        │   └── axios.js           # Axios instance + interceptors
        ├── components/
        │   ├── auth/              # Auth form components
        │   ├── layout/            # Navbar + MainLayout
        │   ├── EmptyState.jsx
        │   ├── PageTransition.jsx
        │   ├── ProgressCard.jsx
        │   ├── PWAInstallBanner.jsx
        │   ├── QuickActions.jsx
        │   ├── Skeleton.jsx
        │   ├── ScrollToTop.jsx
        │   └── UmrahCountdown.jsx
        ├── context/
        │   └── AuthContext.jsx    # Global auth state
        ├── hooks/
        │   ├── useAuth.js         # Auth hook
        │   └── usePWAInstall.js   # PWA install hook
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── ForgotPassword.jsx
        │   ├── ResetPassword.jsx
        │   ├── Dashboard.jsx
        │   ├── UmrahChecklist.jsx
        │   ├── PackingChecklist.jsx
        │   ├── Profile.jsx
        │   └── NotFound.jsx
        ├── utils/
        │   └── packingCategories.js
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js v18+
- Git
- MongoDB Atlas account
- Gmail account (for email features)

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/umrah-companion.git
cd umrah-companion
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/umrahapp
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=Umrah Companion <your_email@gmail.com>
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔑 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint                 | Description       | Auth    |
| ------ | ------------------------ | ----------------- | ------- |
| POST   | `/register`              | Register new user | Public  |
| POST   | `/login`                 | Login user        | Public  |
| GET    | `/me`                    | Get current user  | Private |
| POST   | `/forgot-password`       | Send reset email  | Public  |
| PUT    | `/reset-password/:token` | Reset password    | Public  |

### User Routes (`/api/user`)

| Method | Endpoint           | Description      | Auth    |
| ------ | ------------------ | ---------------- | ------- |
| GET    | `/profile`         | Get user profile | Private |
| PUT    | `/profile`         | Update profile   | Private |
| PUT    | `/change-password` | Change password  | Private |

### Checklist Routes (`/api/checklist`)

| Method | Endpoint            | Description             | Auth    |
| ------ | ------------------- | ----------------------- | ------- |
| GET    | `/umrah`            | Get Umrah checklist     | Private |
| GET    | `/umrah/progress`   | Get Umrah progress      | Private |
| PATCH  | `/umrah/:itemId`    | Toggle Umrah item       | Private |
| DELETE | `/umrah/reset`      | Reset Umrah checklist   | Private |
| GET    | `/packing`          | Get packing checklist   | Private |
| GET    | `/packing/progress` | Get packing progress    | Private |
| PATCH  | `/packing/:itemId`  | Toggle packing item     | Private |
| DELETE | `/packing/reset`    | Reset packing checklist | Private |

---

## 🌿 Environment Variables

### Backend

| Variable       | Description               | Example                           |
| -------------- | ------------------------- | --------------------------------- |
| `PORT`         | Server port               | `5000`                            |
| `NODE_ENV`     | Environment               | `production`                      |
| `MONGO_URI`    | MongoDB connection string | `mongodb+srv://...`               |
| `JWT_SECRET`   | JWT signing secret        | `your_secret_key`                 |
| `JWT_EXPIRE`   | JWT expiry duration       | `30d`                             |
| `EMAIL_HOST`   | SMTP host                 | `smtp.gmail.com`                  |
| `EMAIL_PORT`   | SMTP port                 | `587`                             |
| `EMAIL_USER`   | Gmail address             | `you@gmail.com`                   |
| `EMAIL_PASS`   | Gmail App Password        | `abcd efgh ijkl mnop`             |
| `EMAIL_FROM`   | Sender display name       | `Umrah Companion <you@gmail.com>` |
| `FRONTEND_URL` | Frontend URL for CORS     | `https://your-app.vercel.app`     |

### Frontend

| Variable       | Description          | Example                             |
| -------------- | -------------------- | ----------------------------------- |
| `VITE_API_URL` | Backend API base URL | `https://your-api.onrender.com/api` |

---

## 🚢 Deployment

### Backend → Render

1. Create account at [render.com](https://render.com)
2. New Web Service → connect GitHub repo
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add all environment variables

### Frontend → Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Root Directory: `frontend`
4. Framework: `Vite`
5. Add `VITE_API_URL` environment variable

---

## 🎨 Design System

```
Colors:
  Primary:    #1B4332  Deep Islamic Green
  Secondary:  #40916C  Sage Green
  Accent:     #D4A017  Gold
  Background: #F8F5F0  Warm White
  Text:       #1F2937  Dark Gray

Typography:  System UI / Segoe UI
Icons:       Emoji + React Icons
Animations:  Framer Motion
```

---

## 🤲 Islamic Context

This app was built to help Muslims prepare for Umrah — the pilgrimage to Mecca. The app includes:

- Step-by-step Umrah ritual checklist based on authentic Islamic guidance
- Packing list with Ihram-specific requirements
- Countdown timer to the user's Umrah date
- Daily Quranic reminder: _"And complete the Hajj and Umrah for Allah" — Al-Baqarah 2:196_

**May Allah accept the Umrah of every pilgrim who uses this app. Ameen 🤲**

---

## 👨‍💻 Developer

Built by AqilMustaqim

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
