import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

function EditModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    lecturer: "",
    semester: "",
    category: "",
    difficulty: 0,
    progress: 0,
    status: "",
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchModule = async () => {
      try {
        const res = await api.get(`/modules/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load module:", err);
      }
    };

    fetchModule();
  }, [id]);


  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/modules/${id}`, formData);
      navigate("/"); 
    } catch (err) {
      console.error("Failed to update module:", err);
    }
  };

  if (loading) return <p>Loading module...</p>;

  return (
    <div className="page-section">
      <h2 className="section-title">Edit Module</h2>

      <form className="styled-form" onSubmit={handleSubmit}>


        <label className="form-label">Module Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={updateField}
          placeholder="Enter module name..."
        />


        <label className="form-label">Lecturer</label>
        <input
          name="lecturer"
          value={formData.lecturer}
          onChange={updateField}
          placeholder="Lecturer name..."
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


        <label className="form-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={updateField}
          className="dropdown"
        >
          <option value="">Select Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
}

export default EditModulePage;
