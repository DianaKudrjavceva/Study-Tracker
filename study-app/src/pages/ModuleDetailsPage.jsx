import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";

function ModuleDetailsPage() {
  const { id } = useParams();

  const [moduleData, setModuleData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [notes, setNotes] = useState("");

  const [isTiming, setIsTiming] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    loadModule();
    loadTasks();
    loadSessions();
  }, [id]);

  const loadModule = async () => {
    const res = await api.get(`/modules/${id}`);
    setModuleData(res.data);
    setNotes(res.data.notes || "");
  };

  const loadTasks = async () => {
    const res = await api.get(`/modules/${id}/tasks`);
    setTasks(res.data);
  };

  const loadSessions = async () => {
    const res = await api.get(`/study-sessions/${id}`);
    setSessions(res.data);
  };

  useEffect(() => {
    if (!moduleData || tasks.length === 0) return;

    const completed = tasks.filter((t) => t.completed).length;
    const total = tasks.length;

    const progress = Math.round((completed / total) * 100);
    const status = progress === 100 ? "Completed" : "In Progress";

    setModuleData((prev) => ({
      ...prev,
      progress,
      status,
    }));

    updateModuleProgress(progress, status);
  }, [tasks]);

  const updateModuleProgress = async (progress, status) => {
    await api.put(`/modules/${id}`, { progress, status });
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await api.post(`/modules/${id}/tasks`, { text: newTask });
    setNewTask("");
    loadTasks();
  };

  const toggleTask = async (taskId, completed) => {
    await api.put(`/modules/tasks/${taskId}`, { completed });
    loadTasks();
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/modules/tasks/${taskId}`);
    loadTasks();
  };

  const saveNotes = async () => {
    await api.put(`/modules/${id}/notes`, { notes });
    alert("Notes saved!");
  };

  useEffect(() => {
    let interval = null;

    if (isTiming) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTiming]);

  const startTimer = () => {
    setIsTiming(true);
  };

  const stopTimer = async () => {
    setIsTiming(false);

    const minutes = seconds < 60 ? 1 : Math.round(seconds / 60);

    await api.post("/study-sessions", {
      moduleId: id,
      duration: minutes,
      date: new Date(),
    });

    setSeconds(0);
    loadSessions();
  };

  if (!moduleData) return <p>Loading…</p>;

  return (
    <div className="page-section">
      <h2 className="section-title">{moduleData.title}</h2>

      <div className="details-box">
        <p><strong>Lecturer:</strong> {moduleData.lecturer}</p>
        <p><strong>Semester:</strong> {moduleData.semester}</p>
        <p><strong>Category:</strong> {moduleData.category}</p>
        <p><strong>Difficulty:</strong> {moduleData.difficulty}</p>
        <p><strong>Progress:</strong> {moduleData.progress}%</p>
        <p><strong>Status:</strong> {moduleData.status}</p>
      </div>

      <div className="details-box" style={{ marginTop: "1.5rem" }}>
        <h3>Study Timer</h3>

        <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
        </p>

        {!isTiming && (
          <button className="submit-btn" onClick={startTimer}>
            Start Studying
          </button>
        )}

        {isTiming && (
          <button className="submit-btn" onClick={stopTimer}>
            Stop & Save Session
          </button>
        )}

        <h4 style={{ marginTop: "1.2rem" }}>Study Sessions</h4>
        <ul>
          {sessions.map((s) => (
            <li key={s._id}>
              {new Date(s.date).toLocaleDateString()} — {s.duration} min
            </li>
          ))}
        </ul>
      </div>

      <div className="details-box" style={{ marginTop: "1.5rem" }}>
        <h3>Tasks</h3>

        <div className="task-input">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask} className="icon-btn">
            +
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={task.completed ? "task done" : "task"}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id, !task.completed)}
                />
                <span>{task.text}</span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="details-box" style={{ marginTop: "1.5rem" }}>
        <h3>Notes</h3>

        <textarea
          className="notes-area"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here…"
        />

        <button
          onClick={saveNotes}
          className="submit-btn"
          style={{ marginTop: "1rem" }}
        >
          Save Notes
        </button>
      </div>
    </div>
  );
}

export default ModuleDetailsPage;
