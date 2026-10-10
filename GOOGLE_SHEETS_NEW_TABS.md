# GOOGLE SHEETS - NAYI TABS (Raat ko banayenge)
Aapki "Dawn Cricket Club DB" Google Sheet mein yeh nayi tabs add karni hain:
## 1. Users (naya)
Headers: ID, Email, Name, Picture, Phone, Role, Status, ClubID, CreatedAt, LastLogin
## 2. Clubs (naya)
Headers: ID, Name, Logo, City, Province, OwnerID, OwnerName, OwnerEmail, Contact, TeamsCount, PlayersCount, Status, CreatedAt
## 3. Tournaments (naya)
Headers: ID, Name, Logo, Type, Format, StartDate, EndDate, Venue, Teams, Matches, Status, Winner, CreatedBy, CreatedAt
## 4. MatchCreations (naya)
Headers: ID, TeamA, TeamB, Format, Overs, Venue, Date, Time, Status, TossWinner, TossDecision, CreatedBy, ClubID, TournamentID, Result, CreatedAt
## 5. LiveScore (naya)
Headers: MatchID, Innings, BattingTeam, Runs, Wickets, Balls, Batsman1, Batsman2, Bowler, LastUpdated
## 6. BallByBall (naya)
Headers: ID, MatchID, Innings, Over, BallNumber, Batsman, Bowler, Runs, IsWicket, WicketType, IsExtra, ExtraType, Commentary, Timestamp
## 7. OTP (naya)
Headers: ID, Email, Mobile, OTP, Purpose, ExpiresAt, IsUsed, CreatedAt
## 8. NotificationsLog (naya)
Headers: ID, UserID, Type, Subject, Message, Status, SentAt
---
## PURANI TABS (pehle se hain):
- Players
- Teams
- Matches
- Stats
- News
- Notices
- Academy
- Grounds
- Contact
- Newsletter
- Emails
- Analytics
---
## RAAT KO KYA KARNA HAI:
1. Google Cloud Console mein OAuth Client ID banayein
2. Google Sheet mein nayi tabs banayein (upar wali)
3. Cloudinary account banayein
4. Resend account banayein (Email)
5. Fast2SMS account banayein (SMS)
6. Phir saari APIs ko real data se connect karein
