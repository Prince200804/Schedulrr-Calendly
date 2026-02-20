# 🚀 Deployment Guide for Schedulrr

This guide will walk you through deploying Schedulrr to Vercel step by step.

---

## Prerequisites

Before you begin, make sure you have:
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free)
- A [Clerk](https://clerk.com) account (free tier available)
- A [Neon](https://neon.tech) or [Supabase](https://supabase.com) account for PostgreSQL (free tier)
- A Google Cloud account for Calendar API

---

## Step 1: Set Up PostgreSQL Database

### Option A: Using Neon (Recommended)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Click "Create a project"
3. Name your project "schedulrr"
4. Select a region close to you
5. Click "Create project"
6. Copy the connection string (it looks like: `postgresql://user:pass@host/dbname?sslmode=require`)

### Option B: Using Supabase

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password

---

## Step 2: Set Up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose "Next.js" as your framework
4. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### Configure Google OAuth in Clerk

5. In Clerk Dashboard, go to "User & Authentication" → "Social Connections"
6. Enable "Google"
7. You'll need Google OAuth credentials:

#### Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to "APIs & Services" → "Enable APIs and Services"
4. Search for "Google Calendar API" and enable it
5. Go to "APIs & Services" → "Credentials"
6. Click "Create Credentials" → "OAuth client ID"
7. Select "Web application"
8. Add these Authorized redirect URIs (get exact URLs from Clerk):
   - `https://your-clerk-domain.clerk.accounts.dev/v1/oauth_callback`
   - Your production URL callback
9. Copy the Client ID and Client Secret
10. Paste them in Clerk's Google OAuth settings

### Add Calendar Scopes in Clerk

11. In Clerk's Google OAuth settings, add these scopes:
    - `https://www.googleapis.com/auth/calendar`
    - `https://www.googleapis.com/auth/calendar.events`

---

## Step 3: Push Code to GitHub

If you haven't already initialized git:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Schedulrr - Full-stack scheduling application"

# Create main branch
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/schedulrr.git

# Push to GitHub
git push -u origin main
```

---

## Step 4: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | From Clerk Dashboard |
| `CLERK_SECRET_KEY` | From Clerk Dashboard |
| `NEXT_PUBLIC_APP_URL` | Leave empty for now (update after deployment) |

5. Click "Deploy"

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

---

## Step 5: Post-Deployment Configuration

### Update App URL

1. After deployment, copy your Vercel URL (e.g., `https://schedulrr-abc123.vercel.app`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Add or update `NEXT_PUBLIC_APP_URL` with your deployment URL
4. Redeploy the project

### Update Clerk Settings

1. Go to Clerk Dashboard → Paths
2. Add your Vercel domain to "Allowed origins"

### Run Database Migration

Your database tables should be created automatically via `prisma generate` in the build. If not:

```bash
# Run locally with production DATABASE_URL
npx prisma db push
```

---

## Step 6: Set Up Email Notifications (Optional)

1. Go to [resend.com](https://resend.com) and sign up
2. Create an API key
3. Add to Vercel environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `EMAIL_FROM`: `Schedulrr <noreply@yourdomain.com>`

---

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk public key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your deployed app URL |
| `RESEND_API_KEY` | ❌ | For email notifications |
| `EMAIL_FROM` | ❌ | Sender email address |

---

## Troubleshooting

### Build Fails with Prisma Error
Run `npx prisma generate` locally and commit the changes.

### Google Calendar Not Working
- Ensure Calendar API is enabled in Google Cloud
- Check OAuth scopes are added in Clerk
- User must authenticate with Google through Clerk

### Authentication Redirect Loop
- Check Clerk domain settings
- Verify environment variables are correct
- Clear browser cookies

### Database Connection Error
- Check DATABASE_URL format
- Ensure `?sslmode=require` is at the end
- Verify database is running and accessible

---

## 🎉 Congratulations!

Your Schedulrr application is now live! 

Share your URL and add it to your resume as:

> **Schedulrr** - [schedulrr.vercel.app](https://schedulrr.vercel.app)
> 
> A full-stack scheduling application built with Next.js 14, featuring:
> - User authentication with Clerk and Google OAuth
> - Google Calendar & Meet integration
> - Real-time analytics dashboard with visual charts
> - Email notifications for bookings
> - Dark mode support
> - PostgreSQL database with Prisma ORM
> 
> **Tech Stack:** Next.js, React, Tailwind CSS, Prisma, PostgreSQL, Clerk, Google APIs

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Database commands
npx prisma studio      # Visual database editor
npx prisma db push     # Push schema changes
npx prisma generate    # Generate Prisma client
```
