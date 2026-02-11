import React, { useEffect, useState } from "react";
import NavbarHome from "../components/NavbarHome";
import API_BASE from "../config/api";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


  return (
    <>
      {/* <NavbarHome /> */}

      <div
        className="min-vh-100 d-flex justify-content-center py-5"
        style={{ backgroundColor: "#020617", overflowY: "auto" }}
      >
        <div
          className="card shadow-lg"
          style={{
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "#101528",
            border: "2px solid #1d2a3b",
          }}
        >
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h1 className="h3 fw-bold text-white mb-2">My Profile</h1>
              <p className="text-muted">Your account details</p>
            </div>

            {loading && <p className="text-muted text-center">Loading...</p>}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {profile && (
              <>
                {/* User Info */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-white">
                    Username
                  </label>
                  <input
                    className="form-control form-control-lg"
                    value={profile.user?.username || ""}
                    disabled
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#f8fafc",
                      border: "1px solid #334155",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-white">
                    Email
                  </label>
                  <input
                    className="form-control form-control-lg"
                    value={profile.user?.email || ""}
                    disabled
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#f8fafc",
                      border: "1px solid #334155",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-white">
                    Role
                  </label>
                  <input
                    className="form-control form-control-lg"
                    value={profile.role}
                    disabled
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#f8fafc",
                      border: "1px solid #334155",
                    }}
                  />
                </div>

                {/* Profile Details */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-white">
                    Phone
                  </label>
                  <input
                    className="form-control form-control-lg"
                    value={profile.phone || ""}
                    disabled
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#f8fafc",
                      border: "1px solid #334155",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-white">
                    Address
                  </label>
                  <input
                    className="form-control form-control-lg"
                    value={profile.address_line1 || ""}
                    disabled
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#f8fafc",
                      border: "1px solid #334155",
                    }}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-white">
                      City
                    </label>
                    <input
                      className="form-control form-control-lg"
                      value={profile.city || ""}
                      disabled
                      style={{
                        backgroundColor: "#1e293b",
                        color: "#f8fafc",
                        border: "1px solid #334155",
                      }}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-white">
                      Country
                    </label>
                    <input
                      className="form-control form-control-lg"
                      value={profile.country || ""}
                      disabled
                      style={{
                        backgroundColor: "#1e293b",
                        color: "#f8fafc",
                        border: "1px solid #334155",
                      }}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-white">
                      Postal Code
                    </label>
                    <input
                      className="form-control form-control-lg"
                      value={profile.postal_code || ""}
                      disabled
                      style={{
                        backgroundColor: "#1e293b",
                        color: "#f8fafc",
                        border: "1px solid #334155",
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
