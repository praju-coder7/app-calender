import React from "react";

export default function EventCard({ event, clash }) {
  return (
    <div
      className={`px-2 py-1 rounded mt-1 text-white text-xs ${
        clash ? "bg-rose-500 ring-2 ring-rose-300" : "bg-blue-500"
      }`}
      title={`${event.title} • ${event.time}`}
    >
      {event.title} - {event.time}
    </div>
  );
}
