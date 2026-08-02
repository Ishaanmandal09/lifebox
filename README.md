# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📦 LifeBox

LifeBox is a smart personal inventory management web application that helps users keep track of their belongings and never forget where they stored them. Whether it's important documents, electronics, books, or everyday items, LifeBox allows users to save item details, storage locations, and images for quick retrieval.

---

## 🚀 Problem Statement

People often forget where they have stored their important belongings, resulting in wasted time and frustration. LifeBox provides a simple and organized solution by creating a digital inventory where users can search and manage all their stored items.

---

## ✨ Features

- 🔐 Secure user authentication using Supabase
- 👤 User-specific accounts and data privacy
- ➕ Add new items with details
- 📷 Upload item images
- 📂 Categorize belongings
- 📍 Save exact storage locations
- 🔍 Smart search by item name, category, or location
- 📋 Dashboard displaying items from newest to oldest
- 🗑️ Edit and delete saved items
- 📱 Responsive and clean user interface
- ☁️ Cloud database powered by Supabase
- 🚀 Deployed using Vercel

---

## 💡 Innovation

Unlike traditional note-taking apps, LifeBox is designed specifically for organizing physical belongings. By combining item images, categories, and precise storage locations with fast search functionality, users can instantly locate their possessions from anywhere.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Framer Motion
- Tailwind CSS / CSS

### Backend
- Supabase Authentication
- Supabase Database
- Supabase Storage

### Deployment
- Vercel

---

## 📂 Project Structure

```
LifeBox/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── AddItem.jsx
│   ├── Search.jsx
│   └── Profile.jsx
│
├── supabaseClient.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/LifeBox.git
```

Go into the project

```bash
cd LifeBox
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run the project

```bash
npm run dev
```

---

## 🌐 Deployment

The project is deployed using **Vercel**.

---

## 📸 Screenshots

You can add screenshots here after deployment.

- Home Page
- Login Page
- Dashboard
- Search Page
- Profile Page

---

## 🔮 Future Improvements

- AI-powered search suggestions
- QR code support for stored items
- Barcode scanning
- Shared family inventory
- Item reminders and notifications
- Export inventory as PDF or Excel
- Dark mode
- Mobile application

---

## 👨‍💻 Author

**Your Name**

Developed as a personal project to simplify home inventory management using modern web technologies.

---

## 📄 License

This project is intended for educational and personal use.
