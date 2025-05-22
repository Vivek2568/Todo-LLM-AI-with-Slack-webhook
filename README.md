# Todo Summary Assistant

A fullstack app using React, Firebase, Google Gemini API and Slack integration.

## Setup

1. Set environment variables from `.env.example`
2. Run `npm install` in both frontend and backend folders
3. Use Firebase service account JSON for backend auth
4. Use Slack incoming webhook for notifications

# Run Instruction
   # for backend
      cd Backend
      npm start

   # for frontend
      cd backend
      npm run dev
      
# Design and Architecture

Google Gemini was chosen to summarize the todo-summary and send to the Slack.
Slack Webhook is used to notify team members of summarized to-do progress.
Firebase Firestore provides a scalable and low-friction backend for storing to-dos.
React + Vite ensures fast and modern frontend development with component-based structure.
Service-based architecture was used for better separation of concerns (SlackService, FirebaseService, GeminiService).

