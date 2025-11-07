import React from "react";
import dayjs from "dayjs";
import EventCard from "./EventCard.jsx";

function sameDay(a, b) {
  return dayjs(a).isSame(dayjs(b), "day");
}

function markClashes(events) {
  const out = events.map((e) => ({ ...e, clash: false }));
  const parseTime = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  for (let i = 0; i < out.length; i++) {
    const aStart = parseTime(out[i].time);
    const aEnd = aStart + (out[i].duration || 60);
    for (let j = i + 1; j < out.length; j++) {
      const bStart = parseTime(out[j].time);
      const bEnd = bStart + (out[j].duration || 60);
      if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
        out[i].clash = out[j].clash = true;
      }
    }
  }
  return out;
}

export default function CalendarGrid({ gridDays, events, currentMonth }) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-slate-600 mb-2">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {gridDays.map((d) => {
          const isCurrentMonth = dayjs(d).isSame(currentMonth, "month");
          const isToday = sameDay(d, dayjs());
          const dayEvents = events.filter((e) => e.date === dayjs(d).format("YYYY-MM-DD"));
          const marked = markClashes(dayEvents);

          return (
            <div
              key={d}
              className={`h-32 p-2 border rounded-lg flex flex-col ${
                isCurrentMonth ? "bg-slate-50" : "bg-white opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{dayjs(d).date()}</span>
                {isToday && (
                  <span className="text-xs text-blue-600 font-semibold">Today</span>
                )}
              </div>

              <div className="mt-1 overflow-auto text-xs">
                {marked.slice(0, 3).map((ev, i) => (
                  <EventCard key={i} event={ev} clash={ev.clash} />
                ))}
                {marked.length > 3 && (
                  <div className="text-gray-500 mt-1">+{marked.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
