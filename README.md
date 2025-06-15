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
   ```

2. Set up environment variables:
   Create a `.env` file with the following:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SARVAM_API_KEY=your_sarvam_api_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   S3_BUCKET_NAME=your_s3_bucket_name
   ```

3. Start the development server:
   ```bash
   bun dev
   ```

---

## 📱 Frontend (`paighaam_hackprix`)

### 📄 Description

Mobile application built with Expo/React Native for cross-platform chat experience.

### ⚙️ Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Set up environment variables:
   Create a `.env` file with the following:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_API_BASE_URL=your_backend_url
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

### 📱 Running on Devices

**Android:**
```bash
npx expo run:android
```

**iOS:**
```bash
npx expo run:ios
```

---

## ✨ Features

- ⚡ Real-time chat interface
- 🔐 User authentication via Supabase
- 🌍 Multi-language support
- 🎤 Voice messaging
- 👥 Group chat functionality
- 👤 Profile management

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: Express.js
- **AI Services**: SarvamAI (Translation & Speech)
- **Database**: Supabase
- **Storage**: AWS S3

### Frontend
- **Framework**: React Native / Expo
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: Expo Router
- **Backend Services**: Supabase (Auth & Database)

---

## 📂 Project Structure

```
├── paigam-backend/       # Backend source code and scripts
└── paighaam_hackprix/    # Frontend mobile app source code
```

---

## 🚀 Getting Started

1. Clone the repository
2. Set up the backend following the backend setup instructions
3. Set up the frontend following the frontend setup instructions
4. Start both services and begin development

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.