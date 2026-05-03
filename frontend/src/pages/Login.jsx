import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Header */}
      <header className="auth-header">
        <Link to="/" className="logo">
          <div className="logo-icon">TM</div>
          <span className="logo-text">Team Task Manager</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-card-header">
              <h1>Welcome Back!</h1>
              <p>Sign in to your account to continue</p>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link></p>
              <Link to="/" className="back-link">← Back to Home</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;