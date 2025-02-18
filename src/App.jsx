import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



import CalendarGrid from "./components/CalendarGrid";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CalendarGrid />
    </div>
  );
}
