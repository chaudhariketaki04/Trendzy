import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './AdminApp';
import '../frontend/index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Admin ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif', background: '#F8F9FA' }}>
          <div style={{ maxWidth: '480px', width: '100%', background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>Admin Portal Error</h2>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
              {this.state.error?.message || 'An unexpected error occurred while rendering the admin portal.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{ padding: '10px 20px', background: '#9F2089', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.href = '/';
                }}
                style={{ padding: '10px 20px', background: '#E2E8F0', color: '#1E293B', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              >
                Reset & Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AdminApp />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
