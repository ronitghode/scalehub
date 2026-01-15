import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

import ProfilePage from './pages/ProfilePage';

import ChatPage from './pages/ChatPage';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <Router>
      <SocketProvider>
        <div className="min-h-screen bg-slate-900 text-slate-100">
          <nav className="p-4 border-b border-slate-800 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-slate-900/80">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ScaleHub
            </Link>
            <div className="space-x-4">
              <Link to="/dashboard" className="px-4 py-2 hover:text-blue-400 transition">Dashboard</Link>
              <Link to="/chat" className="px-4 py-2 hover:text-blue-400 transition">Chat</Link>
              <Link to="/profile" className="px-4 py-2 hover:text-blue-400 transition">Profile</Link>
              <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-slate-800 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Get Started</Link>
            </div>
          </nav>

          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </main>
        </div>
      </SocketProvider>
    </Router>
  );
}

export default App;
