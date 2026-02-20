# 📅 Schedulrr - Smart Scheduling Made Simple

<div align="center">
  
  **A modern scheduling application built with Next.js 14, featuring Google Calendar integration, real-time analytics, and email notifications.**

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  
  [Live Demo](https://schedulrr.vercel.app) · [Report Bug](https://github.com/yourusername/schedulrr/issues) · [Request Feature](https://github.com/yourusername/schedulrr/issues)
</div>

---

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** - Powered by Clerk with Google OAuth
- 📅 **Event Management** - Create, edit, and delete events with customizable durations
- ⏰ **Availability Settings** - Set your weekly availability with time gap preferences
- 🔗 **Shareable Links** - Custom booking links for each event
- 🎥 **Google Meet Integration** - Automatic meeting link generation
- 📧 **Email Notifications** - Automated booking confirmations and reminders

### Analytics Dashboard
- 📊 **Visual Charts** - Monthly booking trends and daily distribution
- 📈 **Performance Metrics** - Track total bookings, events, and growth
- 🏆 **Top Events** - See your most popular event types
- ⏱️ **Quick Insights** - Average duration, conversion rate, completion rate

### User Experience
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | JavaScript (React 18) |
| **Styling** | Tailwind CSS, Radix UI |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | Clerk |
| **Calendar** | Google Calendar API |
| **Email** | Resend (optional) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or cloud)
- Clerk account
- Google Cloud project with Calendar API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/schedulrr.git
   cd schedulrr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see [Environment Variables](#environment-variables))

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App URL (for production)
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"

# Email (optional)
RESEND_API_KEY="re_..."
EMAIL_FROM="Schedulrr <noreply@yourdomain.com>"
```

See `.env.example` for detailed documentation of all variables.

---

## 📦 Deployment to Vercel

### Step-by-Step Guide

#### 1. Prepare Your Database

Choose a PostgreSQL provider:
- **[Neon](https://neon.tech)** (Recommended - free tier available)
- **[Supabase](https://supabase.com)** (free tier available)
- **[Railway](https://railway.app)**
- **[PlanetScale](https://planetscale.com)** (MySQL with Prisma adapter)

Copy your database connection string.

#### 2. Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Enable **Google** under "Social Connections"
4. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create/select a project
   - Enable **Google Calendar API**
   - Go to "APIs & Services" > "Credentials"
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs from Clerk dashboard
   - Copy Client ID and Secret to Clerk

5. **Important:** Add these OAuth scopes in Clerk:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`

#### 3. Deploy to Vercel

**Option A: Deploy with Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B: Deploy from GitHub**
1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/schedulrr.git
   git push -u origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
   - `RESEND_API_KEY` (optional)

6. Click "Deploy"

#### 4. Post-Deployment

1. Copy your Vercel deployment URL
2. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
3. Add your Vercel URL to Clerk's allowed origins
4. Run database migrations:
   ```bash
   npx prisma db push
   ```

---

## 📁 Project Structure

```
schedulrr/
├── actions/              # Server actions
│   ├── analytics.js      # Analytics data fetching
│   ├── availability.js   # Availability management
│   ├── bookings.js       # Booking creation
│   ├── dashboard.js      # Dashboard data
│   ├── events.js         # Event CRUD operations
│   ├── meetings.js       # Meeting management
│   └── users.js          # User operations
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (main)/           # Main app pages
│   │   ├── analytics/    # Analytics dashboard
│   │   ├── availability/ # Availability settings
│   │   ├── dashboard/    # User dashboard
│   │   ├── events/       # Events management
│   │   └── meetings/     # Meetings view
│   ├── [username]/       # Public booking pages
│   └── layout.js         # Root layout
├── components/           # React components
│   ├── ui/               # UI components (shadcn)
│   └── ...
├── lib/                  # Utilities
│   ├── emails.js         # Email templates
│   ├── prisma.js         # Prisma client
│   └── utils.js          # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

---

## 🎯 Key Features Explained

### Analytics Dashboard
The analytics page provides visual insights into your scheduling performance:
- **Monthly Trends**: Bar chart showing booking volume over 7 months
- **Daily Distribution**: See which days get the most bookings
- **Top Events**: Ranked list of your most booked events
- **Quick Metrics**: Conversion rate, completion rate, average duration

### Email Notifications
When a booking is made:
- Guest receives a confirmation email with meeting details
- Host receives a notification with guest information
- Emails include Google Meet links

### Dark Mode
Toggle between light and dark themes with persistent preference storage.

---

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Database Commands

```bash
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema to database
npx prisma studio     # Open Prisma Studio
npx prisma migrate dev # Create migration
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Lucide Icons](https://lucide.dev/) - Icons

---

<div align="center">
  Made with ❤️ by Prince Adani
  
  ⭐ Star this repo if you found it helpful!
</div>
