import { useState } from "react";

export default function CalendarGrid() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first and last day of the month
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // Calculate number of empty days before the first day of the month
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Create an array for the calendar grid
  const calendarGrid = [
    ...Array(startDay).fill(null), // Empty slots for alignment
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), // Actual days
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      {/* Month & Year */}
      <h2 className="text-center text-2xl font-bold mb-4">
        {currentMonth.toLocaleString("default", { month: "long" })}{" "}
        {currentMonth.getFullYear()}
      </h2>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-700">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 bg-gray-200 rounded">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {calendarGrid.map((day, index) =>
          day === null ? (
            <div key={`empty-${index}`} className="p-6"></div> // Empty spaces
          ) : (
            <div
              key={day}
              className={`p-6 text-center rounded ${
                day === new Date().getDate() &&
                currentMonth.getMonth() === new Date().getMonth()
                  ? "bg-blue-500 text-white font-bold" // Today's date (highlighted)
                  : "bg-gray-100 text-black font-semibold" // Regular days (now visible)
              }`}
            >
              {day}
            </div>
          )
        )}
      </div>
    </div>
  );
}
