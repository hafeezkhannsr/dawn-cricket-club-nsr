# PHASE 3 - MULTI-USER PLATFORM CHECKLIST
# Generated: 2026-10-10 16:42
# Yeh document raat ke kaam ke liye roadmap hai
============================================
URGENT (Aaj Raat - 4-5 Ghante)
============================================
[ ] 1. GOOGLE OAUTH SETUP (1 ghanta)
    [ ] Google Cloud Console mein OAuth Client ID banayein
    [ ] Authorized redirect URIs add karein
    [ ] Client ID + Secret .env mein daalein
    [ ] Vercel par environment variables set karein
    [ ] Google Sign-In button homepage par lagayein
    [ ] Callback API route complete karein
[ ] 2. USERS DATABASE SHEET (30 minute)
    [ ] Google Sheet mein "Users" naam ka naya tab banayein
    [ ] Headers: ID, Email, Name, Picture, Role, Status, CreatedAt, LastLogin
    [ ] /api/v1/users/register API banayein
    [ ] /api/v1/users/login API banayein
    [ ] Session management implement karein
[ ] 3. USER DASHBOARD (1 ghanta)
    [ ] /dashboard page banayein (sirf logged-in users)
    [ ] Profile card, My Matches, My Teams sections
    [ ] /profile page - user apni info dekh/edit kare
    [ ] Logout functionality
[ ] 4. MATCH CREATION (1 ghanta)
    [ ] /create-match page
    [ ] Team A aur Team B select dropdown
    [ ] Match format (T20, ODI, etc)
    [ ] Date, venue, overs
    [ ] /api/v1/matches/create API
    [ ] Google Sheet mein "MatchCreations" tab
[ ] 5. SQUAD BUILDER (45 minute)
    [ ] Match create karne ke baad squad select karein
    [ ] Player list from Players sheet
    [ ] Playing XI select karein
    [ ] Team wise squads save karein
============================================
IMPORTANT (Kal - 3-4 Ghante)
============================================
[ ] 6. LIVE SCORING (1.5 ghante)
    [ ] /scoring/[matchId] page
    [ ] Ball-by-ball scoring interface
    [ ] Run + Wicket + Extra buttons
    [ ] Over counter, run rate, required rate
    [ ] Undo functionality
    [ ] Save to Google Sheet "LiveScore" tab
[ ] 7. SCOREBOARD (45 minute)
    [ ] /scoreboard/[matchId] public page
    [ ] Batting card, Bowling card
    [ ] Extras, Fall of wickets
    [ ] Real-time refresh (5 second polling)
[ ] 8. NOTIFICATIONS (1 ghanta)
    [ ] Cloudinary account banayein
    [ ] Resend account banayein (Email)
    [ ] Fast2SMS account banayein (SMS)
    [ ] Registration confirmation email
    [ ] Approval confirmation email/SMS
[ ] 9. IMAGE UPLOAD (45 minute)
    [ ] Player photo upload (Cloudinary)
    [ ] NIC front/back upload
    [ ] URL Google Sheet mein save karein
    [ ] Image preview in admin panel
[ ] 10. FORGOT PASSWORD (45 minute)
    [ ] Email-based reset link
    [ ] Mobile OTP (optional)
    [ ] Reset password page
============================================
FINAL (Parso - 2 Ghante)
============================================
[ ] 11. ADMIN vs USER ROLES (30 minute)
    [ ] Admin panel sirf admin ke liye
    [ ] Users ko dashboard tak mehdood rakhein
    [ ] Role-based middleware
[ ] 12. PUBLIC PAGES (30 minute)
    [ ] Bina login match dekhna
    [ ] Live scoreboard public
    [ ] Points table public
[ ] 13. TESTING (1 ghanta)
    [ ] Mobile par test
    [ ] Tablet par test
    [ ] Laptop par test
    [ ] Multiple users se test
============================================
DOMAIN & HOSTING (Aakhri Kaam)
============================================
[ ] Domain khareedein: dawncricketclub.com (\-12/year)
[ ] Vercel se connect karein
[ ] SSL certificate auto-setup
[ ] SEO settings finalize
[ ] Google Analytics add karein
============================================
ACCOUNTS BANANE HAIN (Raat ko)
============================================
[ ] Cloudinary (images) - cloudinary.com
[ ] Resend (emails) - resend.com
[ ] Fast2SMS (SMS) - fast2sms.com
[ ] Google OAuth Client - console.cloud.google.com
============================================
CURRENT STATUS
============================================
DONE:
- Frontend (35+ components)
- Admin Login + Panel
- Google Sheets Integration (read)
- Players/Teams/Matches APIs
- Vercel Deployment
PENDING:
- Google OAuth (multi-user login)
- User Dashboard
- Match Creation by users
- Live Scoring
- Image Upload
- Notifications
- Forgot Password
