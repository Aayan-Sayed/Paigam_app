# Paigam App Workspace

<div align="center">
  <img src="https://via.placeholder.com/150x150.png?text=Paigam" alt="Paigam Logo" />
  <h2>A multilingual chat application with real-time translation and voice messaging</h2>
</div>

---

## 📋 Overview

This workspace contains two main projects:

- **paigam-backend**: The backend service for chat, translation, and speech features  
- **paighaam_hackprix**: The frontend mobile application built with Expo/React Native

---

## 🖥️ Backend (`paigam-backend`)

### 📄 Description

Backend service for chat, translation, and speech, using **Bun** and **SarvamAI**.

### ⚙️ Setup

1. Install dependencies:
   ```bash
   bun install
Set up environment variables:
Create a .env file with the following:

env
Copy
Edit
SARVAM_API_KEY=your_api_key_here
Run the backend:

bash
Copy
Edit
bun run index.ts
For development with auto-reload:

bash
Copy
Edit
bun run dev
✨ Features
🌐 Translation services using SarvamAI

🔊 Text-to-speech conversion

💬 Chat message handling

👥 Group messaging support

📁 S3 file storage integration

📱 Frontend (paighaam_hackprix)
📄 Description
Expo/React Native mobile app for the Paigam chat platform.

⚙️ Setup
Install dependencies:

bash
Copy
Edit
npm install
Start the Expo development server:

bash
Copy
Edit
npx expo start
📱 Running on Devices
Android:

bash
Copy
Edit
npx expo run:android
iOS:

bash
Copy
Edit
npx expo run:ios
✨ Features
⚡ Real-time chat interface

🔐 User authentication via Supabase

🌍 Multi-language support

🎤 Voice messaging

👥 Group chat functionality

👤 Profile management

🛠️ Tech Stack
Backend
Runtime: Bun

Framework: Express.js

AI Services: SarvamAI (Translation & Speech)

Database: Supabase

Storage: AWS S3

Frontend
Framework: React Native / Expo

Styling: NativeWind (TailwindCSS for React Native)

Navigation: Expo Router

Backend Services: Supabase (Auth & Database)

📂 Project Structure
bash
Copy
Edit
├── paigam-backend/       # Backend source code and scripts
└── paighaam_hackprix/    # Frontend mobile app source code
📄 License
This project is for demonstration and hackathon purposes.

Made with ❤️ for HackPrix

vbnet
Copy
Edit

Let me know if you want this in `.md` file format or would like badges, deployment instructions, or API documentation added!