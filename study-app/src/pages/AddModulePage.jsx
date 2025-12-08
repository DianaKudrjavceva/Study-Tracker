import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function AddModulePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    lecturer: "",
    semester: "",
    category: "",
    difficulty: 0,
    progress: 0,
    status: "",
    image: ""   // IMPORTANT
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/modules", formData);
      navigate("/"); 
    } catch (err) {
      console.error("Failed to add module:", err);
    }
  };

  return (
    <div className="page-section">
      <h2 className="section-title">Add New Module</h2>

      <form className="styled-form" onSubmit={handleSubmit}>

        <label className="form-label">Module Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={updateField}
        />

        <label className="form-label">Lecturer</label>
        <input
          name="lecturer"
          value={formData.lecturer}
          onChange={updateField}
        />

        <label className="form-label">Semester</label>
        <select
          name="semester"
          value={formData.semester}
          onChange={updateField}
          className="dropdown"
        >
          <option value="">Select Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>

        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={updateField}
          className="dropdown"
        >
          <option value="">Select Category</option>
          <option value="AppDevelopment">App Development</option>
          <option value="GrapgicDesign">Graphic Design</option>
          <option value="Databases">Databases</option>
          <option value="GameDevelopment">Game Development</option>
          <option value="Marketing">Marketing</option>
        </select>

        <label className="form-label">Difficulty</label>
        <div className="difficulty-stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={num <= formData.difficulty ? "star filled" : "star"}
              onClick={() => setFormData({ ...formData, difficulty: num })}
            >
              ★
            </span>
          ))}
        </div>

        <label className="form-label">Progress: {formData.progress}%</label>
        <input
          type="range"
          name="progress"
          min="0"
          max="100"
          value={formData.progress}
          onChange={updateField}
          className="progress-slider"
        />

        <label className="form-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={updateField}
          className="dropdown"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* IMAGE UPLOAD MUST BE BEFORE SUBMIT */}
        <label className="form-label">Module Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />

        <button className="submit-btn" type="submit">
          Add Module
        </button>
      </form>
    </div>
  );
}

export default AddModulePage;
