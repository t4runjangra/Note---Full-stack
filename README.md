# Note - Full Stack

A full-stack note-taking application built with React, Vite, Express, MongoDB, and JWT-based authentication. The project combines a modern frontend experience with a secure backend API for user management, email verification, password reset, avatar uploads, and personal note storage.

## Overview

This project lets users:
- Create an account and log in securely
- Verify their email address before accessing the app
- Reset forgotten passwords through email links
- Upload profile and cover images using Cloudinary
- Create, view, update, and delete personal notes
- Use a responsive dark/light themed interface

## Features

### Authentication and Security
- User registration with validation
- Secure login with hashed passwords
- JWT access and refresh token authentication
- Refresh token rotation and cookie-based session handling
- Logout support that clears auth cookies
- Email verification before login
- Resend verification email support
- Forgot password flow with reset link emails
- Password reset with expiry-based secure tokens
- Rate limiting for sensitive auth actions
- Input validation using Zod

### Profile Management
- User profile retrieval
- Avatar upload support
- Cover avatar upload support
- Cloudinary-based image storage and cleanup

### Notes Management
- Create notes with title and content
- Fetch all notes belonging to the authenticated user
- Update existing notes
- Delete notes
- Notes are linked to the logged-in user

### Frontend Experience
- Landing page and authentication screens
- Protected routes for authenticated users
- Responsive layout with Tailwind CSS
- Dark and light theme support
- Note creation and management UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Zod for validation
- Multer for file upload handling
- Cloudinary for image hosting
- Nodemailer for sending emails
- express-rate-limit for throttling

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React icons

## Project Structure

```text
backend/
  src/
    controllers/
    db/
    middlewares/
    models/
    routes/
    utils/
    validators/
    app.js
    index.js

Frontend/
  src/
    components/
    context/
    pages/
    App.jsx
    main.jsx
```

## Backend API Endpoints

### Authentication
- POST /api/v1/auth/register
  - Register a new user
  - Sends a verification email
- POST /api/v1/auth/login
  - Authenticates user and creates auth cookies
- GET /api/v1/auth/profile
  - Returns the current authenticated user's profile
- PATCH /api/v1/auth/avatar
  - Uploads and updates the user's avatar
- PATCH /api/v1/auth/cover-avatar
  - Uploads and updates the user's cover avatar
- GET /api/v1/auth/verify-email/:rawToken
  - Verifies a user's email address
- POST /api/v1/auth/resend-verification
  - Resends the verification email
- POST /api/v1/auth/logout
  - Logs the user out and clears auth cookies
- POST /api/v1/auth/forget-password
  - Sends a password reset email
- POST /api/v1/auth/reset-password/:token
  - Resets the user's password

### Notes
- POST /api/v1/note
  - Creates a new note
- GET /api/v1/note
  - Retrieves all notes for the authenticated user
- PATCH /api/v1/note/:id
  - Updates a specific note
- DELETE /api/v1/note/:id
  - Deletes a specific note

## Environment Variables

Create a .env file in the backend folder with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
BACKEND_URL=http://localhost:3000

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_FROM=your_from_email
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Note - Full stack"
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 4. Start the backend

```bash
cd ../backend
npm run dev
```

The backend will run on port 3000 by default.

### 5. Start the frontend

```bash
cd ../Frontend
npm run dev
```

The frontend will run on Vite's default port 5173.

## How the App Works

1. A user registers with a username, email, and password.
2. An email verification link is sent to the email address.
3. Once verified, the user can log in and receive secure auth cookies.
4. Authenticated users can create and manage notes.
5. Users can upload profile and cover images that are stored through Cloudinary.
6. Password reset is handled through a secure email-based token flow.

## Notes on Security

- Passwords are hashed using bcrypt before storage.
- Auth tokens are signed with environment-based secrets.
- Email verification and password reset tokens expire after a limited time.
- Rate limiting is applied to email and password reset requests.
- File uploads are restricted to image types and size limits.

## Future Improvements

Possible enhancements for this project include:
- Complete frontend-backend integration for auth and notes
- Profile page UI for editing user data
- Search and filtering for notes
- Note categories or tags
- Rich text editing
- Better error handling and success notifications
- Deployment to production environments

## License

This project is intended for learning and personal development purposes.
