import { useState } from "react";

export default function CalendarGrid() {
  // Use State to Track the Current Month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Function to Change the Month
  const changeMonth = (offset) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + offset,
        1
      );
      return newMonth;
    });
  };

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // First and last day of the month
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
      {/* Month Navigation Controls */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          ◀ Prev
        </button>
        <h2 className="text-center text-2xl font-bold text-black">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() => changeMonth(1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Next ▶
        </button>
      </div>

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
                  ? "bg-blue-500 text-white font-bold" // Today's date
                  : "bg-gray-100 text-black font-semibold" // Regular days
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
