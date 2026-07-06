import { useState, useEffect } from "react";

function GymAttendanceTracker() {
  const boys = ["Harsh", "Gaurav", "Rahul", "Chaman"];

  // Load attendance from Local Storage
  const [attendanceData, setAttendanceData] = useState(() => {
    const saved = localStorage.getItem("gymAttendance");

    return saved
      ? JSON.parse(saved)
      : {
          Harsh: {},
          Gaurav: {},
          Rahul: {},
          Chaman: {},
        };
  });

  // Save automatically
  useEffect(() => {
    localStorage.setItem(
      "gymAttendance",
      JSON.stringify(attendanceData)
    );
  }, [attendanceData]);

  // Form States
  const [selectedBoy, setSelectedBoy] = useState("Harsh");
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("Present");

  // Save Attendance
  const saveAttendance = () => {
    if (selectedDate === "") {
      alert("Please Select Date");
      return;
    }

    setAttendanceData({
      ...attendanceData,
      [selectedBoy]: {
        ...attendanceData[selectedBoy],
        [selectedDate]: status,
      },
    });

    alert("Attendance Saved Successfully");

    setSelectedDate("");
    setStatus("Present");
  };

  // Dashboard
  const today = new Date().toISOString().split("T")[0];

  const todayPresent = boys.filter(
    (boy) => attendanceData[boy][today] === "Present"
  ).length;

  const todayAbsent = boys.filter(
    (boy) => attendanceData[boy][today] === "Absent"
  ).length;

  // All Dates
  const allDates = [
    ...new Set(
      boys.flatMap((boy) =>
        Object.keys(attendanceData[boy])
      )
    ),
  ].sort();

  return (
    <div className="container">
      <h1>🏋️ Gym Attendance Tracker</h1>

      <hr />

      <div className="section">
        <h2>Today's Dashboard</h2>

        <p>
          <strong>Total Boys:</strong> {boys.length}
        </p>

        <p>
          <strong>Present Today:</strong> {todayPresent}
        </p>

        <p>
          <strong>Absent Today:</strong> {todayAbsent}
        </p>
      </div>

      <hr />

      <div className="section">
        <h2>Update Attendance</h2>

        <label>Select Boy</label>

        <br />

        <select
          value={selectedBoy}
          onChange={(e) =>
            setSelectedBoy(e.target.value)
          }
        >
          {boys.map((boy) => (
            <option key={boy}>{boy}</option>
          ))}
        </select>

        <br />

        <label>Select Date</label>

        <br />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
        />

        <br />

        <label>Status</label>

        <br />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <br />

        <button onClick={saveAttendance}>
          Save Attendance
        </button>
      </div>

      <hr />

      <div className="section">
        <h2>Attendance Summary</h2>

        <table>
          <thead>
            <tr>
              <th>Boy</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Attendance %</th>
            </tr>
          </thead>

          <tbody>
            {boys.map((boy) => {
              const records = Object.values(
                attendanceData[boy]
              );

              const present = records.filter(
                (r) => r === "Present"
              ).length;

              const absent = records.filter(
                (r) => r === "Absent"
              ).length;

              const total = present + absent;

              const percentage =
                total === 0
                  ? 0
                  : ((present / total) * 100).toFixed(1);

              return (
                <tr key={boy}>
                  <td>{boy}</td>
                  <td>{present}</td>
                  <td>{absent}</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <hr />

      <div className="section">
        <h2>Attendance Register</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>

              {boys.map((boy) => (
                <th key={boy}>{boy}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {allDates.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No Attendance Available
                </td>
              </tr>
            ) : (
              allDates.map((date) => (
                <tr key={date}>
                  <td>{date}</td>

                  {boys.map((boy) => (
                    <td key={boy}>
                      {attendanceData[boy][date] ===
                      "Present" ? (
                        <span className="present">
                          ✅ Present
                        </span>
                      ) : attendanceData[boy][date] ===
                        "Absent" ? (
                        <span className="absent">
                          ❌ Absent
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GymAttendanceTracker;