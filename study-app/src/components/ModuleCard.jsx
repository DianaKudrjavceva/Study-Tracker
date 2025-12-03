import { Link } from "react-router-dom";

function ModuleCard({ module }) {
  // pastel illustration placeholders
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
            <span className="card-meta-number">
              Semester {module.semester}
            </span>

            <button className="card-meta-button">
              <i className="ai-circle-triangle-right-fill"></i>
            </button>
          </div>

          <h2 className="card-title">{module.title}</h2>

          <Link to={`/modules/${module._id}`}>
            <button className="view-btn">View</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ModuleCard;
