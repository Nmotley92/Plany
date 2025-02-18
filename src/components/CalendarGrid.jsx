import { useState, useEffect } from "react";

export default function CalendarGrid() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const changeMonth = (offset) => {
    setCurrentMonth((prevMonth) => {
      return new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + offset,
        1
      );
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarGrid = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-500 to-purple-700 text-white p-4">
      <div className="flex justify-between items-center w-full max-w-6xl mb-4 px-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow-lg border border-gray-400 transition duration-200"
        >
          ◀ Prev
        </button>
        <h2 className="text-center text-4xl font-extrabold text-white drop-shadow-lg">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow-lg border border-gray-400 transition duration-200"
        >
          Next ▶
        </button>
      </div>

      {isMobile ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-4xl font-bold p-6 bg-blue-700 text-white rounded-lg shadow-lg">
          <span>Today</span>
          <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-0 text-center font-bold text-white text-lg sm:text-xl w-full max-w-6xl">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-3 bg-gray-400 rounded-lg text-xl md:text-2xl lg:text-3xl shadow-md border border-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0 mt-2 text-lg sm:text-xl w-full max-w-6xl flex-grow h-full">
            {calendarGrid.map((day, index) =>
              day === null ? (
                <div key={`empty-${index}`} className="p-6 aspect-square"></div>
              ) : (
                <div
                  key={day}
                  className={`flex items-center justify-center p-2 aspect-square text-xl md:text-2xl lg:text-3xl font-semibold rounded-lg w-full h-full shadow-md border border-gray-500
                    ${day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth()
                      ? "bg-blue-700 text-white shadow-lg border-white"
                      : "bg-white text-gray-900 hover:bg-gray-200 cursor-pointer transition duration-200"
                    }`}
                >
                  {day}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
