import { Link } from 'react-router-dom';
import '../landing-improvements.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Header with Login/Signup */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">TM</div>
            <span className="logo-text">Team Task Manager</span>
          </div>
          <div className="header-buttons">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="landing-main">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Manage Your Team Tasks
              <span className="highlight"> Efficiently</span>
            </h1>
            <p className="hero-subtitle">
              Create projects, assign tasks, and track progress with role-based access for better team collaboration.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Login
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-title">Dashboard</div>
              </div>
              <div className="preview-content">
                <div className="preview-stats">
                  <div className="stat-card">
                    <div className="stat-number">-</div>
                    <div className="stat-label">Total Tasks</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">-</div>
                    <div className="stat-label">Pending</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">-</div>
                    <div className="stat-label">In Progress</div>
                  </div>
                </div>
                <div className="preview-tasks">
                  <div className="task-placeholder">
                    <span>Your tasks will appear here</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <h2 className="features-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Project Management</h3>
              <p>Create and organize projects with team members</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Task Assignment</h3>
              <p>Assign tasks to team members with priorities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Track task status from Todo to Completed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Role-Based Access</h3>
              <p>Admin and Member roles with different permissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">TM</div>
            <span>Team Task Manager</span>
          </div>
          <p>&copy; 2024 Team Task Manager. Built with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;