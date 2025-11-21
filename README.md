# Lil Movements Website

A Next.js website for Lil Movements dance classes with user authentication and social features.

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in `.local`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/lilmovements"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init_users
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment on Render

### Database Setup
1. Create a PostgreSQL database on Render
2. Copy the database URL from Render dashboard

### Environment Variables
Set these environment variables in your Render service:
- `DATABASE_URL` - Your PostgreSQL connection string from Render
- `NEXTAUTH_SECRET` - A secure random string
- `NEXTAUTH_URL` - Your production domain (e.g., `https://your-app.onrender.com`)

### Build Command
**Important**: Use this build command in Render to ensure Prisma migrations run before building:

```bash
npm install && npm run migrate:deploy && npm run build
```

This command will:
1. Install dependencies
2. Run Prisma migrations on your production database
3. Build the Next.js application

### Start Command
```bash
npm start
```

## Database Migrations

- **Development**: `npm run migrate:dev` - Creates new migration files and applies them
- **Production**: `npm run migrate:deploy` - Applies existing migrations to production database
- **Generate Client**: `npm run db:generate` - Regenerates Prisma client after schema changes

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/prisma` - Database schema and migrations
- `/public` - Static assets