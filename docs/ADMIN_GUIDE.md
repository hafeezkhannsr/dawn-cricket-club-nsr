# DAWN Cricket Club — Admin Guide
## Getting Started
1. Navigate to /admin on the website
2. Login with your admin credentials
3. You will see the Dashboard with a left sidebar
## Default Admin Accounts (Dev Only)
- admin@dawn.local / DawnAdmin#2026 (Super Admin)
- reviewer@dawn.local / DawnReviewer#2026 (Reviewer)
- scorer@dawn.local / DawnScorer#2026 (Scorer)
**Change these passwords immediately in production.**
## Dashboard Sections
### Dashboard
Total registrations, approvals, rejections. Live matches. Recent activity.
### Registrations
View all submitted registrations. Search by reg number, name, mobile. Approve / Reject / Request Correction.
### Users and Roles
Create new admin users. Assign roles.
### Matches
List all matches. Score new matches.
### Academy
View all batches. Coach assignments. Student enrollment.
### Grounds and Bookings
All cricket grounds. Booking rates and availability.
### Analytics
30-day registration trend. Page views. Top players.
### Bulk Import
Upload CSV of player records. Preview before import.
## Common Tasks
### Approve a Player Registration
1. Go to Dashboard, click View on any submission
2. Review all information and documents
3. Verify payment
4. Change Payment status to VERIFIED
5. Click Approve
### Score a Match
1. Go to /scorer
2. Click New Match
3. Fill match details
4. Select striker and bowler, record balls
## Urdu Guide
### رجسٹریشن منظور کرنا
1. ڈیش بورڈ پر جائیں، کسی بھی درخواست پر View دبائیں
2. تمام معلومات اور دستاویزات چیک کریں
3. ادائیگی کی تصدیق کریں
4. Payment status کو VERIFIED میں بدلیں
5. Approve دبائیں
### میچ اسکور کرنا
1. /scorer پر جائیں
2. New Match دبائیں
3. میچ کی تفصیلات بھریں
4. اسٹرائیکر اور بولر منتخب کریں
## Troubleshooting
### Failed to connect
Check internet connection. Verify DATABASE_URL setting.
### Data disappeared after deploy
Configure DATABASE_URL (Neon PostgreSQL). Without it, data is stored in memory only.
## Support
Email: info@dawncricketclub.pk
Website: https://dawn-cricket-club-nsr.vercel.app