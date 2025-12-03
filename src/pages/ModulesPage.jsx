import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ModuleCard from "../components/ModuleCard";

function ModulesPage() {
  const [modules, setModules] = useState([]);

  const loadModules = async () => {
    const res = await api.get("/modules");
    setModules(res.data);
  };

  useEffect(() => {
    loadModules();
  }, []);

  return (
    <div className="page-section">

      <h2 className="section-title">My Modules</h2>
      <p className="section-subtitle">
        Track your study progress this semester.
      </p>

      <div className="search-bar">
        <input placeholder="Search modules..." />
      </div>

      <div className="module-card-grid">
        {modules.map((m) => (
          <ModuleCard key={m._id} module={m} />
        ))}

        {modules.length === 0 && (
          <p className="empty-text">No modules yet. Add one!</p>
        )}
      </div>

    </div>
  );
}

export default ModulesPage;
