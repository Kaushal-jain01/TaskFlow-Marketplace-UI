import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE from '../config/api';
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import StripePayment from "../components/StripePayment";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Worker completion
  const [completionDetails, setCompletionDetails] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Payments
  const [clientSecret, setClientSecret] = useState(null);
  const [billingDetails, setBillingDetails] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks/${id}/`);
      setTask(res.data);
    } catch (err) {
      console.error('Failed to load task', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks/${id}/comments/`);
      setComments(res.data);
    } catch {
      console.error('Failed to load comments');
    }
  };

  useEffect(() => {
    fetchTask();
    fetchComments();
    // eslint-disable-next-line
  }, [id]);

  const getStatusBadge = (status) => {
    const map = {
      open: 'secondary',
      claimed: 'info',
      completed: 'warning',
      approved: 'primary',
      paid: 'success',
    };

    return (
      <span className={`badge bg-${map[status] || 'secondary'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  // ---------------- Worker: Complete Task ----------------
  const handleCompleteTask = async () => {
    if (!completionDetails.trim() || !proofImage) {
      alert('Please add completion details and proof image');
      return;
    }

    const formData = new FormData();
    formData.append('completion_details', completionDetails);
    formData.append('proof_image', proofImage);

    try {
      setSubmitting(true);
      await axios.patch(`${API_BASE}/tasks/${id}/complete/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Task completed');
      setCompletionDetails('');
      setProofImage(null);
      fetchTask();
      fetchComments();
    } catch {
      alert('❌ Failed to complete task');
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------- Delete Task (Business Only) ----------------
  const handleDeleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/tasks/${id}/`);
      alert("🗑 Task deleted successfully");
      navigate(-1); // go back to dashboard
    } catch (err) {
      alert("❌ Failed to delete task");
    }
  };


  // ---------------- Business: Approve ----------------
  const handleApproveTask = async () => {
    try {
      await axios.patch(`${API_BASE}/tasks/${id}/approve/`);
      alert('✅ Task approved');
      fetchTask();
    } catch {
      alert('❌ Approval failed');
    }
  };

  // ---------------- Business: Pay ----------------
  const handlePayTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API_BASE}/tasks/${id}/pay/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setClientSecret(res.data.client_secret);
      setBillingDetails(res.data.billing_details);
      setShowPayment(true);
    } catch {
      alert('❌ Failed to initiate payment');
    }
  };

  // ---------------- Comments ----------------
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(`${API_BASE}/tasks/${id}/comments/`, {
        message: newComment,
      });
      setNewComment('');
      fetchComments();
    } catch {
      alert('Failed to add comment');
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return (
      <div className="d-flex justify-content-center vh-100 align-items-center">
        <div className="spinner-border" />
      </div>
    );
  }

  if (!task) return <p>Task not found.</p>;

  return (
    <div className="container-fluid p-3">

      {/* Back */}
      {/* <button className="btn btn-link mb-2" onClick={() => navigate(-1)}>
        ← Back
      </button> */}

      {/* Header */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        {/* Left side: status + creator */}
        <div className="d-flex gap-2 align-items-center">
          {getStatusBadge(task.status)}
          <small className="text-muted">
            Created by {task.created_by?.username}
          </small>
        </div>

        {/* Right side: Delete button */}
        {task.created_by?.id === user.id && task.status === 'open' && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleDeleteTask}
          >
            🗑 Delete
          </button>
        )}
      </div>

      {/* Task title below header */}
      <h4 className="fw-bold">{task.title}</h4>

      {/* Task Info */}
      <div className="card mb-3">
        <div className="card-body">
          <p>{task.description}</p>
          <div className="d-flex gap-4 text-muted">
            <span>💰 ₹{task.price}</span>
            <span>⏱ {task.duration_minutes} mins</span>
            {task.claimed_by && (
              <span>👤 Claimed by {task.claimed_by.username}</span>
            )}
          </div>
        </div>
      </div>

      {/* Completion Details */}
      {task.status === 'completed' && task.completion && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="fw-bold">Completion Details</h6>
            <p>{task.completion.completion_details}</p>
           {task.completion?.proof_image && (
            <img
              src={task.completion.proof_image}  // Already a full URL 
              alt="Proof"
              className="img-fluid rounded border"
            />
          )}

          </div>
        </div>
      )}

      {/* Worker Completion Form */}
      {task.status === 'claimed' && task.claimed_by?.id === user.id && !task.completion && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="fw-bold">Complete Task</h6>

            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Describe your work..."
              value={completionDetails}
              onChange={(e) => setCompletionDetails(e.target.value)}
            />

            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) => setProofImage(e.target.files[0])}
            />

            <button
              className="btn btn-success"
              disabled={submitting}
              onClick={handleCompleteTask}
            >
              {submitting ? 'Submitting...' : 'Submit Completion'}
            </button>
          </div>
        </div>
      )}

      {/* Business Actions */}
      {task.status === 'completed' && task.created_by?.id === user.id && (
        <button className="btn btn-primary me-2" onClick={handleApproveTask}>
          Approve Task
        </button>
      )}

      {task.status === 'approved' && task.created_by?.id === user.id && (
        <button className="btn btn-success" onClick={handlePayTask}>
          Pay Task
        </button>
      )}

      {/* Comments */}
      <div className="card mt-4">
        <div className="card-body">
          <h6 className="fw-bold mb-3">Comments</h6>

          {comments.map(c => (
            <div key={c.id} className="border rounded p-2 mb-2">
              <small className="fw-bold">{c.user.username}</small>
              <div>{c.message}</div>
            </div>
          ))}

          <div className="d-flex mt-2">
            <input
              className="form-control me-2"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={handleAddComment}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Stripe Modal */}
      {showPayment && clientSecret && (
        <div className="modal show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h5 className="mb-3">Complete Payment</h5>

              <Elements stripe={stripePromise}>
                <StripePayment
                  clientSecret={clientSecret}
                  billing_details={billingDetails}
                  onSuccess={() => {
                    setShowPayment(false);
                    fetchTask();
                  }}
                />
              </Elements>

              <button
                className="btn btn-secondary mt-3 w-100"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
