import React from "react";
import dayjs from "dayjs";

export default function CalendarHeader({ currentMonth, onPrev, onNext, onToday }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold text-slate-800">
        {dayjs(currentMonth).format("MMMM YYYY")}
      </h1>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Today
        </button>
        <button
          onClick={onPrev}
          className="p-2 rounded-lg bg-white border hover:bg-gray-100"
        >
          ◀
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded-lg bg-white border hover:bg-gray-100"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
