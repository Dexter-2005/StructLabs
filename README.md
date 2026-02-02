# 🧪 StructLabs

**StructLabs** is an interactive Data Structure and Algorithm visualization platform designed to help students and developers understand complex concepts through beautiful, real-time animations.

## ✨ Features

### 🟦 Data Structure Visualizers
- **Arrays**: CRUD operations (Insert, Delete, Update, Search) with index tracking.
- **Queues**: FIFO operations (Enqueue, Dequeue, Peek) with Front/Rear pointers.
- **Linked Lists**: Node manipulation (Insert, Delete, Reverse) with pointer animations.
- **Stacks**: LIFO operations and visualizations.

### 🧠 Algorithm Problem Solvers
- **Two Sum**: HashMap visualization for O(n) solution.
- **Binary Numbers**: Queue-based number generation (1 to N).
- **Cycle Detection**: Floyd's Tortoise and Hare algorithm visualization.
- **Parentheses Matching**: Stack-based validity checker.

### 🔐 Authentication
- **Google Sign-In**: Powered by Firebase Authentication.
- **User Sessions**: Persistent login state with `AuthContext`.
- **Profile Management**: Displays user avatar and name.

### 🎨 Modern UI
- **Glassmorphism**: Premium frosted glass effects.
- **Dark/Light Mode**: Fully responsive theme toggle.
- **Responsiveness**: Mobile-friendly layout using Tailwind CSS v4.

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Routing**: React Router v7
- **Auth**: Firebase v11

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/usy8189/AlgoCanvas.git
cd AlgoCanvas
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a project in [Firebase Console](https://console.firebase.google.com/), getting your web app config.
Open `src/firebase/firebase.ts` and replace the placeholders:
```typescript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    // ... other keys
};
```
> **Note**: The app runs safely without keys, but Sign In will be disabled.

### 4. Run Locally
```bash
npm run dev
```

## 📄 License
MIT
