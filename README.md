# Nabha Health - Telemedicine App for Rural Punjab

A multilingual telemedicine application designed specifically for Nabha and surrounding rural areas in Punjab, India. The app addresses healthcare challenges in rural communities by providing AI-powered symptom checking, video consultations, digital health records, and real-time medicine availability.

## Features

### Core Features
- **Multilingual Support**: English and Hindi interface
- **AI-Powered Symptom Checker**: Optimized for low-bandwidth areas
- **Video Consultations**: Connect with doctors in 5 seconds
- **Digital Health Records**: Accessible offline for rural patients
- **Real-time Medicine Availability**: Check local pharmacy stock
- **Voice Call Integration**: Twilio + Ultravox AI agent integration
- **Emergency Services**: Quick access to emergency contacts

### Mobile-First Design
- Responsive design optimized for mobile devices
- Offline capabilities for areas with poor connectivity
- Simple, intuitive interface for users with varying literacy levels
- Visual icons and clear navigation

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Voice Integration**: Twilio + Ultravox AI
- **Deployment**: Cloudflare (OpenNext.js)
- **State Management**: React hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- Bun (recommended) or npm
- Twilio account with phone number
- Ultravox account with AI agent

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nabha-app
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Ultravox Configuration
ULTRAVOX_API_KEY=your_ultravox_api_key
ULTRAVOX_AGENT_ID=your_ultravox_agent_id
```

### Development

Start the development server:
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
bun run build
# or
npm run build
```

### Deployment to Cloudflare

```bash
bun run deploy
# or
npm run deploy
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── make-call/          # Voice call API endpoint
│   ├── ai-chat/                # AI symptom checker
│   ├── appointments/           # Appointment management
│   ├── book-appointment/       # Appointment booking
│   ├── consult-doctor/         # Doctor consultation
│   ├── emergency/              # Emergency services
│   ├── pharmacy/               # Medicine availability
│   ├── profile/                # User profile
│   ├── records/                # Health records
│   ├── video-consult/          # Video consultation
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   └── CallIntegration.tsx     # Voice call component
```

## Key Features Implementation

### 1. AI Symptom Checker (`/ai-chat`)
- Multilingual chat interface (English/Hindi)
- Simulated AI responses for common symptoms
- Integration with voice call system
- Quick action buttons for common symptoms

### 2. Voice Call Integration (`/api/make-call`)
- Twilio + Ultravox integration
- AI agent for voice consultations
- Template context for personalized calls
- Error handling and status reporting

### 3. Digital Health Records (`/records`)
- Offline-first design
- Local storage for cached records
- Sync when online
- Multiple record types (consultations, lab tests, prescriptions)

### 4. Medicine Availability (`/pharmacy`)
- Real-time pharmacy lookup
- Medicine availability status
- Local pharmacy information
- Offline cached data

### 5. Video Consultations (`/video-consult`)
- Simulated video call interface
- Doctor information and availability
- Technical requirements display
- Alternative options for connectivity issues

## Configuration

### Twilio Setup
1. Create a Twilio account
2. Purchase a phone number
3. Get Account SID and Auth Token
4. Configure webhook URLs if needed

### Ultravox Setup
1. Create an Ultravox account
2. Set up an AI agent with the provided prompt
3. Get API key and Agent ID
4. Test the agent configuration

### AI Agent Prompt
The app uses a multilingual AI voice agent with the following capabilities:
- Symptom checking and triage
- Pharmacy lookup
- Appointment scheduling
- Emergency guidance
- Multilingual support (English/Hindi)

## Offline Capabilities

The app is designed to work in low-connectivity areas:
- Cached health records
- Offline medicine availability
- Local storage for user data
- Progressive Web App features

## Accessibility Features

- Large, clear buttons and text
- Visual icons for better understanding
- Simple navigation
- Multilingual support
- High contrast colors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@nabhahealth.com
- Phone: +91 98765 43210
- Address: Nabha Civil Hospital, Punjab, India

## Acknowledgments

- Nabha Civil Hospital staff
- Punjab Health Department
- Local pharmacy partners
- Rural community members who provided feedback