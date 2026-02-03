import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';

export default function ClaimedTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Completion states
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [completionDetails, setCompletionDetails] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Comments states
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchClaimedTasks();
  }, []);

  const fetchClaimedTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks/?type=claimed`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching claimed tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // COMPLETE TASK
  // =========================
  const handleCompleteTask = async (taskId) => {
    if (!proofImage || !completionDetails.trim()) {
      alert('Please provide proof image and completion details');
      return;
    }

    const formData = new FormData();
    formData.append('proof_image', proofImage);
    formData.append('completion_details', completionDetails);

    try {
      setSubmitting(true);
      await axios.patch(
        `${API_BASE}/tasks/${taskId}/complete/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      alert('✅ Task completed successfully');
      setActiveTaskId(null);
      setCompletionDetails('');
      setProofImage(null);
      fetchClaimedTasks();
    } catch (err) {
      alert('❌ Failed to complete task');
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // COMMENTS
  // =========================
  const fetchComments = async (taskId) => {
    try {
      const res = await axios.get(`${API_BASE}/tasks/${taskId}/comments/`);
      setComments(prev => ({ ...prev, [taskId]: res.data }));
    } catch (err) {
      console.error('Failed to load comments');
    }
  };

  const handleAddComment = async (taskId) => {
    if (!newComment.trim()) return;

    try {
      await axios.post(`${API_BASE}/tasks/${taskId}/comments/`, {
        message: newComment,
      });

      setNewComment('');
      fetchComments(taskId);
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="p-3">
      <h4>Claimed Tasks</h4>
      <hr />

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : tasks.length === 0 ? (
        <p>No claimed tasks yet.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="card mb-3">
            {/* Card Body */}
<div className="card-body">
  <div className="d-flex justify-content-between align-items-start mb-2">
    {/* Left: Task Title */}
    <h5 className="card-title">{task.title}</h5>

    {/* Right: Complete Button
    {task.claimed_by?.id === user.id && (
      <button
        className="btn btn-sm btn-success"
        onClick={() => setActiveTaskId(task.id)}
      >
        Complete Task
      </button>
    )} */}
  </div>

  {/* Description */}
  <p className="card-text">{task.description}</p>

  {/* Price & Duration */}
  <p className="card-text">
    <small className="text-muted">
      Price: ₹{task.price} | Duration: {task.duration_minutes} mins
    </small>
  </p>

              {/* COMPLETE FORM */}
              {activeTaskId === task.id && (
                <div className="mt-3 border-top pt-3">
                  <div className="mb-2">
                    <label className="form-label">Completion Details</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={completionDetails}
                      onChange={(e) => setCompletionDetails(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Proof Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setProofImage(e.target.files[0])}
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    disabled={submitting}
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    {submitting ? 'Submitting...' : 'Submit Completion'}
                  </button>
                </div>
              )}

              {/* DETAILS */}
              <div className="mt-3">
                <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => navigate(`../tasks/${task.id}`)}
              >
                View Details
              </button>
              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}
