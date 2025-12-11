import { Routes, Route, Link } from "react-router-dom";
import ModulesPage from "./pages/ModulesPage";
import AddModulePage from "./pages/AddModulePage";
import ModuleDetailsPage from "./pages/ModuleDetailsPage";
import EditModulePage from "./pages/EditModulePage";
import DashboardPage from "./pages/DashboardPage";

import "./styles/StudyUI.css";

function App() {
  return (
    <div className="app-container">


      <header className="web-header">
        <div className="header-left">
          <div className="logo-icon">
            <span></span><span></span><span></span><span></span>
          </div>
          <h1 className="app-title">Study Tracker</h1>
        </div>

        <nav className="header-nav">
          <Link to="/">Modules</Link>
          <Link to="/modules/new">Add Module</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className="header-right">
          <button className="notif-btn">
            <i className="ai-bell"></i>
          </button>

        </div>
      </header>

 
      <main className="page-content">
        <Routes>
          <Route path="/" element={<ModulesPage />} />
          <Route path="/modules/new" element={<AddModulePage />} />
          <Route path="/modules/:id" element={<ModuleDetailsPage />} />
          <Route path="/modules/edit/:id" element={<EditModulePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
