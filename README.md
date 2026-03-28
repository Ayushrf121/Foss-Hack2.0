# 🩺 SehatSaathi

> **Demystifying medical terminology — instantly, securely, and in your own language.**

SehatSaathi is a full-stack AI-powered medical report analysis platform. Users upload their lab reports (PDF or image) and receive a clear, plain-language explanation of their results — including multilingual output in English, Hindi, and Hinglish — powered by Google Gemini and Sarvam AI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Architecture & Data Flow](#architecture--data-flow)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [AI Pipeline](#ai-pipeline)
- [Database Models](#database-models)
- [Frontend Pages & Components](#frontend-pages--components)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Security](#security)

---

## Overview

SehatSaathi bridges the gap between complex medical jargon and everyday understanding. It is built for the common person — especially in India — where medical literacy and language barriers often prevent people from truly understanding their own health reports.

**Core promise:** Upload your report → get a friendly, easy-to-read summary → in your language → in seconds.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Redux Toolkit | Global state (auth token) |
| Tailwind CSS v4 | Utility-first styling |
| ReactMarkdown + rehype-raw | Render AI-formatted responses |
| React Hook Form | Login/Signup form management |
| React Toastify | Toast notifications |
| AOS | Scroll animations |
| Google Identity Services | OAuth 2.0 Google login |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Stateless authentication |
| bcrypt | Password hashing |
| Multer | File upload handling (memory storage) |
| Joi | Request body validation |
| Google Auth Library | Google OAuth token verification |
| Axios | HTTP client for AI API calls |

### AI Services
| Service | Role |
|---|---|
| Google Gemini API | Primary medical report analysis (vision + text) |
| Sarvam AI (`sarvam-m`) | Multilingual refinement — English, Hindi, Hinglish |

---

## Project Structure

```
sehat-saathi/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── AuthController.js      # Signup, Login, Google Auth
│   │   ├── reportController.js    # Report analysis pipeline
│   │   └── historyController.js   # Save, fetch, delete history
│   ├── middleware/
│   │   └── AuthValidation.js      # Joi validation middleware
│   ├── models/
│   │   ├── users.js               # User schema
│   │   └── history.js             # Report history schema
│   ├── routes/
│   │   ├── AuthRoute.js           # /auth/*
│   │   ├── reportRoute.js         # /report/*
│   │   └── historyRoute.js        # /history/*
│   ├── medical_prompt.txt         # Gemini system prompt
│   ├── sarvam_prompt.txt          # Sarvam multilingual prompt
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── assets/                # Images, logos
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Header.jsx     # Sticky nav with auth state
    │   │   │   └── Footer.jsx     # Links + legal
    │   │   ├── LoginWeb/
    │   │   │   ├── LoginPage.jsx  # Login/Signup modal
    │   │   │   └── LoginPage.css
    │   │   └── sections/
    │   │       ├── Home/          # Hero, HowItWorks, Features, FAQ
    │   │       └── Report/        # Dropzone, FilePreview, AnalyzeAction, ReportHeader
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Report.jsx         # Upload + trigger analysis
    │   │   ├── Response.jsx       # Display analysis result
    │   │   ├── History.jsx        # User report history
    │   │   ├── PrivacyPolicy.jsx
    │   │   ├── Terms.jsx
    │   │   └── DataSecurity.jsx
    │   ├── redux/
    │   │   ├── Store.js
    │   │   └── Slicers/
    │   │       └── profileToken.js  # Auth token slice
    │   ├── util/
    │   │   └── Toasting.jsx       # Toast helper functions
    │   ├── App.jsx                # Routes + layout
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Tailwind import + globals
    └── package.json
```

---

## Features

### 🔬 Medical Report Analysis
- Upload lab reports as **PDF, JPG, PNG, or WebP** (up to 10 MB)
- Drag-and-drop or browse file upload via `Dropzone` component
- Report is sent as base64 to **Google Gemini** for vision-based analysis
- Output is refined and translated by **Sarvam AI** into three languages

### 🌐 Multilingual Output
Every analysis is returned in three formats:
- 🇬🇧 **English** — Clean, structured explanation
- 🇮🇳 **Hindi** — Full translation in Devanagari
- 🤝 **Hinglish** — Casual Hindi-English mixed for accessibility

### 🔐 Authentication
- **Email/Password** signup and login with JWT tokens
- **Google OAuth 2.0** one-tap login via Google Identity Services
- Persistent sessions via `localStorage` + Redux state
- Separate handling for `local` vs `google` provider accounts

### 📜 Report History
- Every analysis is automatically saved to the user's account (when logged in)
- View past reports on the `/history` page with expandable result cards
- Each card shows filename, date/time, and the full analysis
- One-click **Remove** button to delete individual history entries
- "View full response" button to re-open any result on the `/response` page

### 🏠 Home Page
Composed of four sections:
- **Hero** — Full-screen background with CTA
- **How It Works** — 3-step process explanation
- **Features** — 4 feature cards (multilingual, secure, fast, insightful)
- **FAQ** — Accordion-style frequently asked questions

### ⚖️ Legal Pages
- `/privacy` — Privacy Policy (accordion UI)
- `/services` — Terms of Service (card UI)
- `/dataSecurity` — Data Security (stats + pillar cards)

---

## Architecture & Data Flow

```
User uploads file (PDF/Image)
        │
        ▼
  POST /report/analyze
  (Multer → memory buffer)
        │
        ▼
  Read medical_prompt.txt
        │
        ▼
  Google Gemini API  ←── base64 file + prompt
  (Vision model)
        │
        ▼
  Gemini raw result (English)
        │
        ▼
  Sarvam AI (sarvam-m)  ←── sarvam_prompt.txt
  (Multilingual refinement)
        │
        ▼
  Final result returned to frontend
        │
        ├──► Navigate to /response (display result)
        │
        └──► POST /history/save (if user is logged in)
                    │
                    ▼
              MongoDB histories collection
```

---

## API Reference

### Auth — `/auth`

| Method | Endpoint | Description | Body |
|---|---|---|---|
| POST | `/auth/signup` | Register new user | `{ name, email, password }` |
| POST | `/auth/login` | Login with email/password | `{ email, password }` |
| POST | `/auth/google` | Google OAuth login | `{ token }` (Google ID token) |

### Report — `/report`

| Method | Endpoint | Description | Body |
|---|---|---|---|
| POST | `/report/analyze` | Analyze uploaded report | `multipart/form-data` with `file` field |

### History — `/history`

> All history routes require `Authorization: Bearer <JWT>` header.

| Method | Endpoint | Description | Body |
|---|---|---|---|
| GET | `/history` | Fetch all history for logged-in user | — |
| POST | `/history/save` | Save a new analysis result | `{ fileName, result }` |
| DELETE | `/history/:id` | Delete a history entry by ID | — |

---

## Authentication

### Flow — Email/Password
1. User submits form → validated by **Joi** middleware (`AuthValidation.js`)
2. Password hashed with **bcrypt** (10 salt rounds) on signup
3. On login, `bcrypt.compare` verifies password
4. A **JWT** is signed with `process.env.JWT_SECRET` and returned
5. Frontend stores token in `localStorage` and Redux store (`profileToken` slice)
6. On app load, `Header.jsx` rehydrates Redux from `localStorage`

### Flow — Google OAuth
1. Google Identity Services renders a sign-in button in `LoginPage.jsx`
2. On callback, the Google ID token is sent to `POST /auth/google`
3. Backend verifies the token with `OAuth2Client.verifyIdToken()`
4. If user doesn't exist → new user created with `provider: 'google'`
5. If user exists with `provider: 'local'` → rejected with an error message
6. JWT returned to frontend, same session flow as email login

### Token Validation (History routes)
History controller extracts and verifies the JWT from the `Authorization` header directly — no separate middleware layer.

---

## AI Pipeline

### Stage 1 — Google Gemini (Vision Analysis)

- **Endpoint:** `process.env.GEMINI_API_URL` + `process.env.GEMINI_API_KEY`
- **Input:** `medical_prompt.txt` system instructions + base64-encoded file
- **Prompt behaviour:**
  - Validates document is actually a medical report
  - Extracts patient name, age, and sex
  - Highlights only abnormal or important values (skips normal ones)
  - Each finding prefixed with ➡️ on its own line
  - Ends with a short 3–4 sentence Summary
- **Fallback:** If Sarvam fails, the raw Gemini output is returned to the user

### Stage 2 — Sarvam AI (Multilingual Refinement)

- **Endpoint:** `https://api.sarvam.ai/v1/chat/completions`
- **Model:** `sarvam-m`
- **Input:** Formatted Gemini output
- **Output:** Three-section response — English, Hindi, Hinglish
- **Prompt source:** `sarvam_prompt.txt` (with BOM stripping for Windows compatibility)
- **Post-processing:** `<think>...</think>` tags stripped from output

---

## Database Models

### User (`userdatas` collection)

| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Optional (not present for Google users) |
| `provider` | String | `'local'` or `'google'` |
| `googleId` | String | Populated for Google users |

### History (`histories` collection)

| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Ref to `userdatas`, required |
| `fileName` | String | Original uploaded file name |
| `result` | String | Full AI-generated analysis text |
| `createdAt` | Date | Auto-generated (timestamps: true) |
| `updatedAt` | Date | Auto-generated (timestamps: true) |

---

## Frontend Pages & Components

### Pages

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing page with Hero, HowItWorks, Features, FAQ |
| `/report` | `Report.jsx` | File upload + analysis trigger |
| `/response` | `Response.jsx` | Displays analysis result via route state |
| `/history` | `History.jsx` | User's saved report history |
| `/privacy` | `PrivacyPolicy.jsx` | Accordion privacy policy |
| `/services` | `Terms.jsx` | Terms of service cards |
| `/dataSecurity` | `DataSecurity.jsx` | Security pillars with stats |

### Key Components

| Component | Location | Role |
|---|---|---|
| `Header` | `components/common/` | Fixed nav, auth-aware, mobile responsive |
| `Footer` | `components/common/` | Links to all legal pages |
| `LoginPage` | `components/LoginWeb/` | Login/Signup modal overlay |
| `Dropzone` | `components/sections/Report/` | Drag-and-drop file input |
| `FilePreview` | `components/sections/Report/` | Shows selected file info |
| `AnalyzeAction` | `components/sections/Report/` | Analyze button + security note |
| `ReportHeader` | `components/sections/Report/` | Page title/description for report page |

### State Management (Redux)

```
Store
└── token (profileToken slice)
    ├── token: string | null
    ├── addToken(token)     → sets token
    ├── removeToken()       → clears token (logout)
    └── setToken(token)     → rehydrates from localStorage
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB
MONGO_CONN=mongodb+srv://<user>:<password>@cluster.mongodb.net/sehat-saathi

# JWT
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Gemini AI
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=
GEMINI_API_KEY=your_gemini_api_key

# Sarvam AI
SARVAM_API_KEY=your_sarvam_api_key
```

> ⚠️ Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console project with OAuth 2.0 credentials
- Gemini API key (Google AI Studio)
- Sarvam AI API key

### Backend Setup

```bash
cd backend
npm install
# Create .env file with variables listed above
npm start
# Server runs on http://localhost:4000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

> **Note:** The Google Client ID is currently hardcoded in `LoginPage.jsx`. Move it to an `.env` file (`VITE_GOOGLE_CLIENT_ID`) for production.

---

## Security

| Concern | Implementation |
|---|---|
| Password storage | bcrypt with 10 salt rounds |
| Auth tokens | JWT signed with secret, stored in localStorage |
| Google tokens | Verified server-side via `OAuth2Client.verifyIdToken()` |
| Input validation | Joi schemas on all auth endpoints |
| File uploads | Memory storage only — files never written to disk |
| History access | JWT verified on every history route request |
| CORS | Enabled globally via `cors()` middleware |

> **Medical reports** are processed entirely in memory (Multer `memoryStorage`) and converted to base64 before being sent to the AI APIs. No report file is ever written to disk or stored in the database — only the text result is saved to history.

---

## Disclaimer

SehatSaathi is intended for **educational purposes only**. The AI-generated analysis is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a licensed medical professional for any health-related decisions.

---

*Built with ❤️ for accessible healthcare in India.*
