import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";

function ModuleDetailsPage() {
  const { id } = useParams();

  const [moduleData, setModuleData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [notes, setNotes] = useState("");

  // =============================
  // Load module info + tasks
  // =============================
  useEffect(() => {
    loadModule();
    loadTasks();
  }, [id]);

  const loadModule = async () => {
    const res = await api.get(`/modules/${id}`);
    setModuleData(res.data);
    setNotes(res.data.notes || ""); // load saved notes
  };

  const loadTasks = async () => {
    const res = await api.get(`/modules/${id}/tasks`);
    setTasks(res.data);
  };

  // =============================
  // Add a new task
  // =============================
  const addTask = async () => {
    if (!newTask.trim()) return;

    await api.post(`/modules/${id}/tasks`, { text: newTask });
    setNewTask("");
    loadTasks();
  };

  // =============================
  // Toggle task completion
  // =============================
  const toggleTask = async (taskId, completed) => {
    await api.put(`/modules/tasks/${taskId}`, { completed });
    loadTasks();
  };

  // =============================
  // Delete a task
  // =============================
  const deleteTask = async (taskId) => {
    await api.delete(`/modules/tasks/${taskId}`);
    loadTasks();
  };

  // =============================
  // Save notes
  // =============================
  const saveNotes = async () => {
    await api.put(`/modules/${id}/notes`, { notes });
    alert("Notes saved!");
  };

  if (!moduleData) return <p>Loading…</p>;

  return (
    <div className="page-section">
      <h2 className="section-title">{moduleData.title}</h2>

      {/* BASIC DETAILS */}
      <div className="details-box">
        <p><strong>Lecturer:</strong> {moduleData.lecturer}</p>
        <p><strong>Semester:</strong> {moduleData.semester}</p>
        <p><strong>Category:</strong> {moduleData.category}</p>
        <p><strong>Difficulty:</strong> {moduleData.difficulty}</p>
        <p><strong>Progress:</strong> {moduleData.progress}%</p>
        <p><strong>Status:</strong> {moduleData.status}</p>
      </div>

      {/* ===================== TASKS SECTION ===================== */}
      <div className="details-box" style={{ marginTop: "1.5rem" }}>
        <h3>Tasks</h3>

        {/* Add Task */}
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

        {/* Task List */}
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

      {/* ===================== NOTES SECTION ===================== */}
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
