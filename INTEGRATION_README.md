# Nabha Health App - Backend Integration

This document describes the integration of the Nabha Health app with the app-ref backend server.

## Overview

The Nabha Health app has been successfully integrated with the backend server to provide:
- User authentication with phone number and OTP verification
- Real-time health records from backend data
- Pharmacy inventory integration
- User profile management

## Features Implemented

### 1. Authentication System
- **Phone Number Authentication**: Users enter their phone number
- **OTP Verification**: Dummy OTP system (any 6-digit number works for testing)
- **Persistent Login**: User session stored in localStorage
- **Protected Routes**: All pages require authentication

### 2. Backend Integration
- **API Client**: Centralized API client for all backend communications
- **User Data**: Fetches user tickets and health records from backend
- **Pharmacy Data**: Integrates with pharmacy inventory system
- **Error Handling**: Comprehensive error handling and fallbacks

### 3. Data Flow
- **Health Records**: Displays consultation summaries and prescriptions from backend
- **Pharmacy Search**: Searches medicine availability across pharmacies
- **User Profile**: Shows consultation count and user information

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the nabha-app directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Twilio Configuration (for voice calls)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Ultravox Configuration (for AI voice processing)
ULTRAVOX_API_KEY=your_ultravox_api_key
ULTRAVOX_AGENT_ID=your_ultravox_agent_id
```

### 2. Install Dependencies

```bash
cd nabha-app
npm install
# or
bun install
```

### 3. Start Backend Server

Make sure the backend server is running:

```bash
cd ../app-ref/sih-2025/server
npm install
npm run dev
```

The server should be running on `http://localhost:8080`

### 4. Start Frontend App

```bash
cd nabha-app
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:3000`

## API Endpoints Used

### Authentication
- `POST /api/otp/send` - Send OTP to phone number
- `POST /api/otp/verify` - Verify OTP and get user data

### User Data
- `POST /api/tickets/by-phone` - Get user's health records/tickets
- `GET /api/tickets` - Get all active tickets (for doctors)

### Pharmacy
- `GET /api/inventory?pharmacy_id={id}` - Get pharmacy inventory
- `POST /api/inventory/add` - Add medicine to inventory
- `PATCH /api/inventory/update` - Update medicine details
- `DELETE /api/inventory/remove` - Remove medicine from inventory

### Voice Calls
- `POST /api/call` - Initiate AI-powered voice call

## File Structure

```
src/
├── contexts/
│   ├── AuthContext.tsx          # Authentication state management
│   └── LanguageContext.tsx      # Language switching (existing)
├── components/
│   ├── AuthModal.tsx            # Phone/OTP authentication modal
│   └── ProtectedRoute.tsx       # Route protection wrapper
├── lib/
│   └── api.ts                   # API client for backend communication
└── app/
    ├── page.tsx                 # Home page (integrated)
    ├── records/page.tsx         # Health records (integrated)
    ├── pharmacy/page.tsx        # Pharmacy search (integrated)
    └── profile/page.tsx         # User profile (integrated)
```

## Key Components

### AuthContext
- Manages user authentication state
- Handles login/logout functionality
- Persists user data in localStorage

### API Client
- Centralized API communication
- Type-safe interfaces for all data structures
- Error handling and fallbacks

### ProtectedRoute
- Wraps all pages requiring authentication
- Shows login modal for unauthenticated users
- Redirects to home after successful login

## Testing

### Authentication Flow
1. Open the app - you'll see the login screen
2. Enter any 10-digit phone number
3. Enter any 6-digit OTP (dummy verification)
4. You'll be logged in and see the home page

### Data Integration
1. **Health Records**: Shows consultation data from backend
2. **Pharmacy Search**: Searches medicine availability
3. **User Profile**: Displays user information and consultation count

## Notes

- **Dummy OTP**: For testing, any 6-digit number works as OTP
- **Fallback Data**: If backend is unavailable, app shows sample data
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **TypeScript**: Full TypeScript support with proper type definitions

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend server is running on port 8080
   - Check `NEXT_PUBLIC_API_BASE_URL` in environment variables

2. **Authentication Issues**
   - Clear localStorage and try again
   - Check browser console for error messages

3. **Data Not Loading**
   - Check network tab for failed API calls
   - Verify backend server is responding correctly

### Development Tips

- Use browser dev tools to inspect API calls
- Check console for error messages
- Verify environment variables are loaded correctly
- Test with different phone numbers to see different data

## Future Enhancements

- Real OTP verification with Twilio
- Real-time updates for health records
- Push notifications for new prescriptions
- Offline data synchronization
- Advanced pharmacy search filters






