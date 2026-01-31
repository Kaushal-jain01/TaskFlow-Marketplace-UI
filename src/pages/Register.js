import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE from '../config/api';
import axios from 'axios';
import NavbarHome from '../components/NavbarHome';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile: {
      role: 'worker',
      phone: '',
      address_line1: '',
      city: '',
      country: '',
      postal_code: '',
    },
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE}/auth/register/`, formData);
      navigate('/login');
    } catch (err) {
      if (err.response?.data) {
        const messages = [];
        for (const key in err.response.data) {
          messages.push(`${key}: ${err.response.data[key]}`);
        }
        setError(messages.join(' | '));
      } else {
        setError('Registration failed. Try again.');
      }
    }
  };

  return (
    <>
    <NavbarHome />
    <div
      className="min-vh-100 d-flex justify-content-center py-5"
      style={{ backgroundColor: '#020617', overflowY: 'auto' }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: '#101528',
          border: '2px solid #1d2a3b',
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold text-white mb-2">Join Microtasks</h1>
            <p className="text-muted">Create your account</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Role</label>
              <select
                className="form-select form-select-lg"
                value={formData.profile.role}
                onChange={(e) =>
                  setFormData({ ...formData, profile: { ...formData.profile, role: e.target.value } })
                }
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              >
                <option value="worker">Worker</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Optional profile fields */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Phone</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={formData.profile.phone}
                onChange={(e) =>
                  setFormData({ ...formData, profile: { ...formData.profile, phone: e.target.value } })
                }
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-white">Address</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={formData.profile.address_line1}
                onChange={(e) =>
                  setFormData({ ...formData, profile: { ...formData.profile, address_line1: e.target.value } })
                }
                style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold text-white">City</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={formData.profile.city}
                  onChange={(e) =>
                    setFormData({ ...formData, profile: { ...formData.profile, city: e.target.value } })
                  }
                  style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold text-white">Country</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={formData.profile.country}
                  onChange={(e) =>
                    setFormData({ ...formData, profile: { ...formData.profile, country: e.target.value } })
                  }
                  style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold text-white">Postal Code</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={formData.profile.postal_code}
                  onChange={(e) =>
                    setFormData({ ...formData, profile: { ...formData.profile, postal_code: e.target.value } })
                  }
                  style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Create Account
            </button>
          </form>

          <div className="text-center">
            <small className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                Sign in
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
