🕋 Umrah Companion

Your complete full-stack web application for Umrah preparation — built with React, Node.js, MongoDB and deployed as a PWA.

Show Image
Show Image
Show Image
Show Image
Show Image
Show Image

🌐 Live Demo
ServiceURLFrontendhttps://umrah-app-mocha.vercel.appBackend APIhttps://umrah-app-5ffq.onrender.com/api/health

✨ Features
🔐 Authentication

User registration and login
JWT-based authentication
Forgot password via email
Reset password with secure token
Password strength meter

🕋 Umrah Checklist

10 step-by-step Umrah tasks
Niat Ihram → Tawaf → Saie → Tahallul and more
Animated checkboxes with progress tracking
Saves progress per user to database
Reset checklist anytime

🎒 Packing Checklist

28 essential items across 5 categories
Categories: Ihram, Documents, Clothing, Medicine, Toiletries
Per-category progress bars
Filter by category
Collapsible category sections

👤 Profile

View and edit profile details
Set Umrah date for countdown timer
Change password securely
Progress overview

📊 Dashboard

Personalized welcome with Islamic greeting
Countdown timer to Umrah date
Real-time progress cards
Quick access navigation
Daily Quran verse reminder

📱 PWA Support

Installable on mobile as a native app
Offline caching with service worker
Add to Home Screen support
Mobile-first responsive design

🛠️ Tech Stack
Frontend
TechnologyPurposeReact 18 + ViteUI framework and build toolTailwindCSSUtility-first stylingFramer MotionSmooth animationsReact Router DOMClient-side routingReact Hook FormForm handling and validationAxiosHTTP client with interceptorsReact Hot ToastToast notificationsvite-plugin-pwaPWA support
Backend
TechnologyPurposeNode.js + ExpressREST API serverMongoDB AtlasCloud databaseMongooseMongoDB object modelingJWTStateless authenticationbcryptjsPassword hashingNodemailerEmail sendingcryptoSecure token generation
Deployment
ServicePurposeVercelFrontend hosting + CDNRenderBackend hostingMongoDB AtlasDatabase hostingGitHubVersion control + CI/CD

📁 Project Structure
umrah-app/
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── controllers/
│ │ ├── authController.js # Auth logic
│ │ ├── checklistController.js # Checklist logic
│ │ └── userController.js # Profile logic
│ ├── middleware/
│ │ └── authMiddleware.js # JWT verification
│ ├── models/
│ │ ├── User.js # User schema
│ │ └── Checklist.js # Checklist schema
│ ├── routes/
│ │ ├── authRoutes.js # /api/auth/_
│ │ ├── checklistRoutes.js # /api/checklist/_
│ │ └── userRoutes.js # /api/user/\*
│ ├── utils/
│ │ ├── defaultChecklist.js # Default checklist data
│ │ ├── emailTemplates.js # HTML email templates
│ │ ├── generateToken.js # JWT generator
│ │ └── sendEmail.js # Nodemailer helper
│ ├── .env.example # Environment variables template
│ └── server.js # Express entry point
│
└── frontend/
├── public/
│ └── icons/ # PWA icons
└── src/
├── api/
│ └── axios.js # Axios instance + interceptors
├── components/
│ ├── auth/ # Auth form components
│ ├── layout/ # Navbar + MainLayout
│ ├── EmptyState.jsx
│ ├── PageTransition.jsx
│ ├── ProgressCard.jsx
│ ├── PWAInstallBanner.jsx
│ ├── QuickActions.jsx
│ ├── Skeleton.jsx
│ ├── ScrollToTop.jsx
│ └── UmrahCountdown.jsx
├── context/
│ └── AuthContext.jsx # Global auth state
├── hooks/
│ ├── useAuth.js # Auth hook
│ └── usePWAInstall.js # PWA install hook
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── ForgotPassword.jsx
│ ├── ResetPassword.jsx
│ ├── Dashboard.jsx
│ ├── UmrahChecklist.jsx
│ ├── PackingChecklist.jsx
│ ├── Profile.jsx
│ └── NotFound.jsx
├── utils/
│ └── packingCategories.js
├── App.jsx
└── main.jsx

🚀 Getting Started (Local Development)
Prerequisites

Node.js v18+
Git
MongoDB Atlas account
Gmail account (for email features)

1. Clone the Repository
   bashgit clone https://github.com/YourUsername/umrah-companion.git
   cd umrah-companion
2. Setup Backend
   bashcd backend
   npm install
   Create .env file:
   envPORT=5000
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
   Start the backend:
   bashnpm run dev
   Backend runs on http://localhost:5000
3. Setup Frontend
   bashcd ../frontend
   npm install
   Create .env file:
   envVITE_API_URL=http://localhost:5000/api
   Start the frontend:
   bashnpm run dev
   Frontend runs on http://localhost:5173

🔑 API Endpoints
Auth Routes (/api/auth)
MethodEndpointDescriptionAuthPOST/registerRegister new userPublicPOST/loginLogin userPublicGET/meGet current userPrivatePOST/forgot-passwordSend reset emailPublicPUT/reset-password/:tokenReset passwordPublic
User Routes (/api/user)
MethodEndpointDescriptionAuthGET/profileGet user profilePrivatePUT/profileUpdate profilePrivatePUT/change-passwordChange passwordPrivate
Checklist Routes (/api/checklist)
MethodEndpointDescriptionAuthGET/umrahGet Umrah checklistPrivateGET/umrah/progressGet Umrah progressPrivatePATCH/umrah/:itemIdToggle Umrah itemPrivateDELETE/umrah/resetReset Umrah checklistPrivateGET/packingGet packing checklistPrivateGET/packing/progressGet packing progressPrivatePATCH/packing/:itemIdToggle packing itemPrivateDELETE/packing/resetReset packing checklistPrivate

🌿 Environment Variables
Backend
VariableDescriptionExamplePORTServer port5000NODE_ENVEnvironmentproductionMONGO_URIMongoDB connection stringmongodb+srv://...JWT_SECRETJWT signing secretyour_secret_keyJWT_EXPIREJWT expiry duration30dEMAIL_HOSTSMTP hostsmtp.gmail.comEMAIL_PORTSMTP port587EMAIL_USERGmail addressyou@gmail.comEMAIL_PASSGmail App Passwordabcd efgh ijkl mnopEMAIL_FROMSender display nameUmrah Companion <you@gmail.com>FRONTEND_URLFrontend URL for CORShttps://your-app.vercel.app
Frontend
VariableDescriptionExampleVITE_API_URLBackend API base URLhttps://your-api.onrender.com/api

🚢 Deployment
Backend → Render

Create account at render.com
New Web Service → connect GitHub repo
Root Directory: backend
Build Command: npm install
Start Command: node server.js
Add all environment variables

Frontend → Vercel

Create account at vercel.com
Import GitHub repo
Root Directory: frontend
Framework: Vite
Add VITE_API_URL environment variable

🎨 Design System
Colors:
Primary: #1B4332 Deep Islamic Green
Secondary: #40916C Sage Green
Accent: #D4A017 Gold
Background: #F8F5F0 Warm White
Text: #1F2937 Dark Gray

Typography: System UI / Segoe UI
Icons: Emoji + React Icons
Animations: Framer Motion

🤲 Islamic Context
This app was built to help Muslims prepare for Umrah — the pilgrimage to Mecca. The app includes:

Step-by-step Umrah ritual checklist based on authentic Islamic guidance
Packing list with Ihram-specific requirements
Countdown timer to the user's Umrah date
Daily Quranic reminder: "And complete the Hajj and Umrah for Allah" — Al-Baqarah 2:196

May Allah accept the Umrah of every pilgrim who uses this app. Ameen 🤲

👨‍💻 Developer
Built by Built by AqilMustaqim

📄 License
This project is open source and available under the MIT License.
