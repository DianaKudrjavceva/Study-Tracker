import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ModuleCard from "../components/ModuleCard";

function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadModules = async () => {
    const res = await api.get("/modules");
    setModules(res.data);
  };

  useEffect(() => {
    loadModules();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this module?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/modules/${id}`);

      setModules((prev) => prev.filter((mod) => mod._id !== id));
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };

  /* ------------------------------
        FILTERED MODULES LIST
  ------------------------------ */
  const filteredModules = modules.filter((mod) => {
    const text = searchTerm.toLowerCase();

    return (
      mod.title.toLowerCase().includes(text) ||
      mod.lecturer.toLowerCase().includes(text) ||
      mod.category.toLowerCase().includes(text) ||
      String(mod.semester).includes(text)
    );
  });

  return (
    <div className="page-section">
      <h2 className="section-title">My Modules</h2>
      <p className="section-subtitle">
        Track your study progress this semester.
      </p>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* MODULE LIST */}
      <div className="module-card-grid">
        {filteredModules.map((m) => (
          <ModuleCard
            key={m._id}
            module={m}
            onDelete={handleDelete}
          />
        ))}

        {filteredModules.length === 0 && (
          <p className="empty-text">No modules match your search.</p>
        )}
      </div>
    </div>
  );
}

export default ModulesPage;
