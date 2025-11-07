import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import eventsData from "../data/events.json";

function buildMonthGrid(anchor) {
  const startOfMonth = dayjs(anchor).startOf("month");
  const startGrid = startOfMonth.startOf("week");
  const days = [];
  for (let i = 0; i < 42; i++) days.push(startGrid.add(i, "day"));
  return days;
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const gridDays = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);
  const onPrev = () => setCurrentMonth((m) => m.subtract(1, "month"));
  const onNext = () => setCurrentMonth((m) => m.add(1, "month"));
  const onToday = () => setCurrentMonth(dayjs().startOf("month"));
  const monthStart = currentMonth.startOf("month").format("YYYY-MM-DD");
  const monthEnd = currentMonth.endOf("month").format("YYYY-MM-DD");
  const events = eventsData.filter((e) => e.date >= monthStart && e.date <= monthEnd);

  return (
    <div className="w-full">
      <CalendarHeader currentMonth={currentMonth} onPrev={onPrev} onNext={onNext} onToday={onToday} />
      <CalendarGrid gridDays={gridDays} events={events} currentMonth={currentMonth} />
      <p className="mt-4 text-sm text-slate-600">
        <strong>Tip:</strong> Overlapping events are ringed in pink.
      </p>
    </div>
  );
}
