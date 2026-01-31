import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset previous error
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <NavbarHome />
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#020617' }}>
      <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%', backgroundColor: '#101528', border: '2px solid #1d2a3b' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold text-white mb-2">Welcome Back</h1>
            <p className="text-muted">Sign in to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold text-white">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-white">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Sign In
            </button>
          </form>

          <div className="text-center">
            <small className="text-muted">
              Don't have an account?{' '}
              <Link to="/register" className="text-decoration-none fw-semibold text-primary">
                Sign up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
