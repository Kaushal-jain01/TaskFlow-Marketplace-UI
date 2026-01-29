import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-primary fs-4">
            TaskFlow
          </span>

          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">
            Get Tasks Done. Get Paid.
          </h1>
          <p className="lead mt-3 mb-4">
            TaskFlow Marketplace connects businesses with skilled workers
            to complete tasks faster, smarter, and securely.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-light btn-lg px-4">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">📌 Post Tasks</h3>
                  <p className="card-text text-muted">
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
                  <p className="card-text text-muted">
                    Workers claim tasks, submit proof of work, and get paid
                    quickly.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">🔔 Real-time Updates</h3>
                  <p className="card-text text-muted">
                    Get instant notifications for task claims, completions,
                    and payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-light py-5 text-center">
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
