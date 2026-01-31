import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarHome() {
  return (
    <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: '#101528' }}>
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-4 text-white">
          TaskFlow Marketplace
        </span>

        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-light">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
