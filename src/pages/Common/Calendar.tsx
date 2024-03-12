import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval
} from "date-fns";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 32)); // 다음 달로 넘어가도록 현재 월에 32일을 더함
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -32)); // 이전 달로 넘어가도록 현재 월에서 32일을 뺌
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center py-2">
        <button onClick={prevMonth} className="px-4 py-2 border rounded">
          Prev
        </button>
        <span className="text-xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={nextMonth} className="px-4 py-2 border rounded">
          Next
        </button>
      </div>
    );
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div className="text-center font-medium" key={day}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div
            className={`text-center py-1 ${
              format(day, "MMMM yyyy") === format(currentMonth, "MMMM yyyy")
                ? "text-black"
                : "text-gray-400"
            }`}
            key={i}
            onClick={() => onDateSelect(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto mt-3">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
