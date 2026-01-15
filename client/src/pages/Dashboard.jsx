import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto rounded-2xl bg-slate-800 p-8 border border-slate-700">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">User Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                    <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
                    <div className="flex items-center gap-2 text-green-400">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span>You are securely logged in via JWT.</span>
                    </div>
                    <p className="mt-4 text-slate-400 text-sm break-all">
                        Token: {token?.slice(0, 50)}...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
