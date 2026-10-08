# API Documentation

All endpoints are versioned: /api/v1/...

## Authentication

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | /api/v1/auth/signup | email, password, name | Create account |
| POST | /api/v1/auth/login | email, password | Login |
| GET | /api/v1/auth/me | - | Current user |
| POST | /api/v1/auth/logout | - | Logout |

## Registrations

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1/registrations | List all |
| POST | /api/v1/registrations | Create new |
| GET | /api/v1/registrations/[id] | Get one |
| PATCH | /api/v1/registrations/[id] | Update status |
| DELETE | /api/v1/registrations/[id] | Delete |

## Matches

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1/matches | List all |
| POST | /api/v1/matches | Create match |
| GET | /api/v1/matches/[id] | Get match |
| POST | /api/v1/matches/[id]/ball | Record ball |

## Tickets

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1/tickets | List all |
| POST | /api/v1/tickets | Create booking |

## Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1/admin/stats | Full platform stats |

## Standard Response

```json
{
  "ok": true,
  "items": [],
  "message": "..."
}
```

Error:
```json
{
  "ok": false,
  "error": "Human-readable message"
}
```
