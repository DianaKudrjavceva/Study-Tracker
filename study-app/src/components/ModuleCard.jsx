import { Link } from "react-router-dom";

function ModuleCard({ module, onDelete }) {

  const images = [
    "https://assets.codepen.io/285131/illustration-hand-with-cigarette-icon.jpg",
    "https://assets.codepen.io/285131/hand-drawn-monster-milkshake.jpg",
    "https://assets.codepen.io/285131/pink-pastel-juicy-banana.jpg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  return (
    <article className="card">
      <div className="card-inner">
        <span className="card-pin"></span>

        <div className="card-image">
          <img src={randomImg} alt="module-illustration" />
        </div>

        <div className="card-content">
          <div className="card-meta">
            <span className="card-meta-number">Semester {module.semester}</span>

            <div className="card-actions">

              <Link to={`/modules/edit/${module._id}`}>
                <button className="icon-btn">✏️</button>
              </Link>

              <button 
                className="icon-btn delete-btn"
                onClick={() => onDelete(module._id)}
              >
                🗑️
              </button>
            </div>
          </div>

          <h2 className="card-title">{module.title}</h2>

          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ transform: `scaleX(${module.progress / 100})` }}
            ></div>
          </div>
          <p className="progress-label">{module.progress}% Complete</p>

          <Link to={`/modules/${module._id}`}>
            <button className="view-btn">View</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ModuleCard;
