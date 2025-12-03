import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function AddModulePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    lecturer: "",
    semester: "",
    category: "",
    difficulty: "",
    progress: "",
    status: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/modules", form);
    navigate("/");
  };

  return (
    <div className="page-section">
      <h2 className="section-title">Add New Module</h2>

      <form className="styled-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Module Title" onChange={handleChange} />
        <input name="lecturer" placeholder="Lecturer" onChange={handleChange} />
        <input name="semester" placeholder="Semester" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="difficulty" placeholder="Difficulty (1-5)" onChange={handleChange} />
        <input name="progress" placeholder="Progress %" onChange={handleChange} />
        <input name="status" placeholder="Status (In progress / Completed)" onChange={handleChange} />

        <button className="submit-btn" type="submit">
          Add Module
        </button>
      </form>
    </div>
  );
}

export default AddModulePage;
