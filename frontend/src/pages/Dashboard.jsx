import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    fetchTaskStats();
  }, []);

  const fetchTaskStats = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      const tasks = response.data;

      const stats = {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(task => task.status === 'done').length,
        pendingTasks: tasks.filter(task => task.status === 'todo').length,
        inProgressTasks: tasks.filter(task => task.status === 'inprogress').length
      };

      setStats(stats);
      setError('');
    } catch (err) {
      setError('Failed to fetch task statistics');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's an overview of your tasks</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.totalTasks}</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending Tasks</h3>
            <p className="stat-number">{stats.pendingTasks}</p>
          </div>
        </div>

        <div className="stat-card progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgressTasks}</p>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed Tasks</h3>
            <p className="stat-number">{stats.completedTasks}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <a href="/projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="/tasks" className="btn btn-secondary">
            View All Tasks
          </a>
          {user?.role === 'admin' && (
            <>
              <button className="btn btn-success" onClick={() => window.location.href = '/projects'}>
                Create Project
              </button>
              <button className="btn btn-info" onClick={() => window.location.href = '/tasks'}>
                Create Task
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;