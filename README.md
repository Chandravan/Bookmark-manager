This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://bookmark-manager-murex-six.vercel.app/] with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

# 📌 MarkIt - Modern Bookmark Manager

A clean, minimalist, and secure bookmark management application built with **Next.js 15** and **Supabase**. This tool allows users to organize their project resources and important links in a unified, professional dashboard.

## Live Demo

**[https://bookmark-manager-murex-six.vercel.app]**

---

## Features

- **Secure Authentication:** Integrated Google OAuth using Supabase Auth for a seamless, passwordless login.
- **Protected Layouts:** Implemented a Root Layout that conditionally renders the Navbar only for authenticated users.
- **CRUD Operations:** Fully functional interface to add, view, and delete bookmarks.
- **Modern UI/UX:** Styled with **Tailwind CSS**, featuring:
  - Responsive card layouts.
  - Tactile feedback (active-scale buttons).
  - Clean, accessible typography.
- **Real-time Auth State:** Uses `onAuthStateChange` to instantly update the UI when a user logs in or out without requiring a page refresh.
- **Optimistic UI:** Local state updates immediately upon bookmark deletion to provide a lag-free experience.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Google OAuth)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## ⚙️ Local Setup

Follow these steps to run the project on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Chandravan/Bookmark-manager
    cd Bookmark-manager
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🧠 Key Logic & Architecture

### 1. Unified Layout

The application uses a **Root Layout** approach. It wraps the entire app in a session check, ensuring that the navigation bar and private dashboard elements are only injected once the user is verified.

### 2. Dynamic Redirect Management

To ensure the app works across both Localhost and Production (Vercel), the OAuth flow uses `window.location.origin` as the redirect source. This eliminates hardcoded URLs and makes the deployment process smoother.

### 3. Data Protection (RLS)

Security is handled at the database level using Supabase **Row Level Security (RLS)**. Each delete or fetch request is scoped to the `user_id`, ensuring users can never access or modify each other's data.

### 4. Component Reusability

The UI is broken down into small, functional components (e.g., `BookmarkList`, `Navbar`), making the codebase easy to maintain and scale.

---

## 📄 License

This project is open-source and available for educational purposes.

**Developed by Chandravan**
