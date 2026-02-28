import { NavLink, Outlet, useLocation, matchPath, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  History,
  Hand,
  Clock,
  LogOut,
  User,
  Bell
} from 'lucide-react';
import '../styles/DashboardLayout.css';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notifications/unread-count/`);
      console.log("Unread notifications count:", res.data);
      setUnreadCount(res.data.unread_count);
    } catch (error) {
      console.error('Error fetching unread count', error);
    }
  };

  const workerLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Claimed Tasks', path: '/dashboard/claimed', icon: ClipboardList },
    { label: 'Completed Tasks', path: '/dashboard/completed', icon: CheckCircle },
    { label: 'History', path: '/dashboard/history', icon: History },
  ];

  const businessLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Open Tasks', path: '/dashboard/posted', icon: ClipboardList },
    { label: 'Claimed Tasks', path: '/dashboard/claimed', icon: Hand },
    { label: 'Pending', path: '/dashboard/completed', icon: Clock },
    { label: 'History', path: '/dashboard/history', icon: History },
  ];

  const links = user?.role === 'worker' ? workerLinks : businessLinks;

  const routeTitles = [
    ...links,
    { path: '/tasks/create', label: 'Create Task' },
    { path: '/tasks/detail/:id', label: 'Task Details' },
  ];

  const pageTitle =
    routeTitles.find(route =>
      matchPath({ path: route.path, end: true }, location.pathname)
    )?.label || 'Dashboard';

  return (
    <div className="dashboard-layout" style={{ backgroundColor: '#020617', color: '#f8fafc' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ backgroundColor: '#101528', borderRight: '1px solid #1d2a3b' }}>
        <Logo />

        <nav className="sidebar-nav">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                color: '#f8fafc',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                marginBottom: '0.25rem',
                backgroundColor: 'transparent',
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main section */}
      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <header className="topbar" style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '1rem 2rem', backgroundColor: '#101528', borderBottom: '1px solid #1d2a3b' 
        }}>
          <h2 className="page-title" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
            TaskFlow Marketplace
          </h2>

          <div className="profile-section" 
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            {/* 🔔 Notification Bell */}
            <div 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Bell size={20} color="#f8fafc" />

              {/* Notification Badge (hardcoded for now) */}
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '10px',
                    padding: '2px 6px',
                    fontWeight: 'bold'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>

            <div 
              className="profile" 
              onClick={() => navigate('/dashboard/profile')}
            >
              <User size={20} color="#f8fafc" />
              <div className="profile-info" >
                <span 
                  className="name" 
                >
                  {user?.username || 'User'}
                </span>
                <span 
                  className="role" 
                >
                  {user?.role}
                </span>
              </div>
            </div>

            <button 
              className="logout-btn" 
              onClick={logout} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.4rem 0.75rem',
                backgroundColor: '#dc2626',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-main" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
