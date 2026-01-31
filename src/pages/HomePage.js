import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE from "../config/api";
import { useEffect } from "react";
import NavbarHome from '../components/NavbarHome';

export default function HomePage() {

  useEffect(() => {
    // Wake up backend
    axios.get(`${API_BASE}/health/`)
      .then(() => {
        console.log("Backend awake");
      })
      .catch(() => {
        console.log("Backend wake-up failed");
      });
  }, []);

  return (
    <>
      {/* Navbar */}
      <NavbarHome />


      {/* Hero Section */}
      <section className="hero text-center py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">
            Get Tasks Done. Get Paid.
          </h1>
          <p className="lead mt-3 mb-4">
            TaskFlow Marketplace connects businesses with skilled workers
            to complete tasks faster, smarter, and securely.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4">
              Login
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="features text-center py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">📌 Post Tasks</h3>
                  <p className="card-text">
                    Businesses can post tasks in minutes and manage everything
                    from a single dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">⚡ Claim & Complete</h3>
                  <p className="card-text">
                    Workers claim tasks, submit proof of work, and get paid
                    quickly.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">💬 Task Discussions</h3>
                    <p className="card-text">
                    Workers and businesses can communicate directly
                    through task-based comments.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta light-section py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">
            Start earning or get work done today
          </h2>
          <Link to="/register" className="btn btn-primary btn-lg px-5">
            Join TaskFlow
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-3 text-muted">
        © {new Date().getFullYear()} TaskFlow Marketplace
      </footer>
    </>
  );
}
