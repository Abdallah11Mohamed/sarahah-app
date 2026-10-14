# Sarahah NoSQL Assignment

## Requirements
- Node.js (ES modules)
- MongoDB running locally or a MongoDB connection URI
- npm

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set `MONGO_URI` and a strong `JWT_SECRET`.
3. Start the API:
   ```bash
   npm run start:dev
   ```
4. Optional seed data:
   ```bash
   npm run seed
   ```

Seed users:
- `demo@example.com` / `DemoPass123`
- `test@example.com` / `TestPass123`

## API endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/signup` | No | Create account |
| POST | `/auth/login` | No | Login and get access token |
| GET | `/users/profile` | Bearer token | Get current user's profile |
| GET | `/users?page=1&limit=10` | Bearer token | List users with pagination |
| PATCH | `/users/:userId` | Bearer token, own user only | Update username/email/phone |
| DELETE | `/users/:userId` | Bearer token, own user only | Delete own account |

### Signup body
```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "password": "DemoPass123",
  "phone": "01012345678"
}
```

### Login body
```json
{
  "email": "demo@example.com",
  "password": "DemoPass123"
}
```

Login response includes `data.accessToken`. Use it in Postman via Authorization > Bearer Token.

### Update body
```json
{
  "username": "updated_user",
  "phone": "01012345678"
}
```

## Validation and error handling
- Zod validation supports body, query, and params.
- Global error middleware returns consistent JSON errors.
- JWTs expire based on `JWT_EXPIRES_IN` (default `15m`).
- Passwords are hashed using Argon2.
- Passwords are excluded from user responses.

## Notes
- The seed script skips accounts that already exist; it does not overwrite their passwords.
- Do not commit `.env` or real secrets.
- Message CRUD is not implemented because the uploaded project does not contain a Message model.
