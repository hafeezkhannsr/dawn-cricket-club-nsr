# DAWN Cricket Club — Database Setup
## Why do I need a database?
Without a database, all registrations, bookings, and matches are stored in memory and **lost when the server restarts**. With Neon PostgreSQL:
- ✅ All data persists forever
- ✅ Multiple users see the same data
- ✅ Admin changes are permanent
- ✅ Free tier: **10 GB storage, unlimited projects**
## Free Setup (5 minutes)
### Step 1: Create Neon Account
1. Go to **https://neon.tech**
2. Click **Sign Up** (use GitHub account — fastest)
3. No credit card required
### Step 2: Create Project
1. Dashboard → **New Project**
2. Name: `dawn-cricket-club`
3. Region: **Singapore (Asia)** — closest to Pakistan
4. Click **Create Project**
### Step 3: Get Connection String
1. In the project dashboard, click **Connection Details**
2. Copy the connection string — looks like:
### Step 4: Add to Vercel
1. Vercel Dashboard → Your Project → **Settings → Environment Variables**
2. Add new variable:
- **Name:** `DATABASE_URL`
- **Value:** (paste the connection string)
- **Environments:** Production + Preview + Development
3. Click **Save**
### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click `⋯` on latest → **Redeploy**
**Done!** All new registrations will now persist.
## Verify It's Working
1. Open your site → register a test player
2. Vercel → **Deployments → Redeploy** (without code change)
3. After deploy, check admin — the registration should still be there ✅
## Local Development
For local dev, just leave `DATABASE_URL` empty in `.env.local`. The app will use SQLite automatically.
## Backup
Neon has **automatic backups** built-in. Free tier keeps 7 days of history.
## Troubleshooting
**"Failed to connect"** → Check that the connection string has `?sslmode=require` at the end.
**"Data disappeared after deploy"** → `DATABASE_URL` not set. Add it and redeploy.
**"Slow queries"** → Neon free tier is fast enough for our use case. If needed, upgrade to Launch plan ($19/month).