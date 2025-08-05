# Vyuh Frontend

A React-based frontend application for the Vyuh collaborative AI agent framework. This repository contains the user interface for interacting with AI agents and managing crew configurations.

## Features

- 🤖 Interactive agent management interface
- 👥 Crew builder for creating AI agent teams
- 🎨 Modern, responsive UI design
- ⚡ Real-time agent status updates
- �� Mobile-friendly design

## Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

## Installation

1. **Clone the Repository**

```bash
git clone <repository-url>
cd vyuh-frontend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Available Scripts

- `npm start` - Starts the development server
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── AgentCard/      # Agent display components
│   ├── CrewBuilder/    # Crew creation interface
│   └── CrewCart/       # Crew management components
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## Configuration

To connect to a backend API, update the API endpoints in your components. The application is designed to work with the Vyuh backend API.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Firebase Integration

This project is integrated with Firebase for:
- **Authentication**: Email/password and Google sign-in
- **Database**: Firestore for storing crews and agents
- **Storage**: Firebase Storage for file uploads
- **Hosting**: Automatic deployment to Firebase Hosting
- **Cloud Functions**: Backend API calls through Firebase Functions

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing project
   - Enable Authentication, Firestore, Storage, and Functions

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=vyuh-web.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=vyuh-web
   REACT_APP_FIREBASE_STORAGE_BUCKET=vyuh-web.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_BACKEND_URL=https://vyuh-backend-production.up.railway.app
   ```

3. **Deploy to Firebase**
   ```bash
   # Build and deploy everything
   npm run deploy
   
   # Deploy specific services
   npm run deploy:hosting
   npm run deploy:firestore
   npm run deploy:storage
   npm run deploy:functions
   ```

### Firebase Services Used

- **Authentication**: Email/password and Google sign-in
- **Firestore**: NoSQL database for crews and agents
- **Storage**: File storage for uploads
- **Hosting**: Web hosting with automatic deployments
- **Functions**: Backend API calls (can replace external backend)

### Security Rules

The project includes security rules for:
- **Firestore**: Users can only access their own data
- **Storage**: Users can only access their own files
