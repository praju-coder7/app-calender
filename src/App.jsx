import React from "react";
import Calendar from "./components/Calendar.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-6xl">
        <Calendar />
      </div>
    </div>
  );
}
