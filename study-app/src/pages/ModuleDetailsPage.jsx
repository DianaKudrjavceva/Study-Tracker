import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";

function ModuleDetailsPage() {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    api.get(`/modules/${id}`).then((res) => setModuleData(res.data));
  }, [id]);

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
    </div>
  );
}

export default ModuleDetailsPage;
