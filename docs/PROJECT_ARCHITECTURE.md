# DAWN Cricket Club — Project Architecture

## Overview

DAWN Cricket Club is a **world-class digital cricket ecosystem** built with modern web technologies. It combines player registration, live scoring, tournament management, academy administration, ground booking, ticketing, and content management in one unified platform.

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| Language | TypeScript 5.7 |
| UI | React 19 + Tailwind CSS v4 |
| Database | SQLite (dev) / Neon PostgreSQL (prod) |
| Auth | JWT + bcrypt |
| Deploy | Vercel |

## Folder Structure

```
app/
  admin/        # Admin dashboard
  match-central/ # Cricket hub
  academy/       # Academy module
  player/        # Player portal
  register/      # Registration wizard
  api/v1/       # Versioned API
```

## Security Model

- Authentication: JWT in HTTP-only cookies
- Authorization: Role-based
- Input validation: Zod schemas
- File uploads: Size + MIME + magic bytes

## Deployment

1. Push to GitHub -> triggers Vercel build
2. Vercel builds with `npx next build`
3. Database -> Neon PostgreSQL

## Performance

- Lighthouse target: 95+ on all metrics
- Bundle size: < 105 KB first load JS
- Caching: Static pages cached at FDN edge

## Accessibility

- WCAG 2.2 AA target
- Semantic HTML
- Keyboard navigation
- Screen reader tested
- Color contrast 4.5:1 minimum
- Reduced motion support
