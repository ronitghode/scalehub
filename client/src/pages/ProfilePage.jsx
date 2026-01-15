import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Save, Edit2 } from 'lucide-react';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        displayName: '',
        bio: '',
        avatarUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(res.data || {});
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 404) {
                setProfile({}); // No profile yet
            } else {
                setError('Failed to load profile');
            }
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/profile', profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(res.data);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to save profile');
        }
    };

    if (loading) return <div className="text-center p-10 text-slate-400">Loading profile...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <User className="text-blue-400" /> User Profile
                    </h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
                    >
                        {isEditing ? 'Cancel' : <><Edit2 size={16} /> Edit</>}
                    </button>
                </div>

                {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6">{error}</div>}

                {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-slate-400 mb-2">Display Name</label>
                            <input
                                type="text"
                                value={profile.displayName || ''}
                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-2">Bio</label>
                            <textarea
                                value={profile.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none h-32"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-2">Avatar URL</label>
                            <input
                                type="text"
                                value={profile.avatarUrl || ''}
                                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                                placeholder="https://example.com/me.jpg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold flex items-center gap-2"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center border-2 border-slate-600">
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={40} className="text-slate-500" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{profile.displayName || 'No Name Set'}</h2>
                                <p className="text-slate-400 mt-1">Joined: {new Date(profile.createdAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                            <h3 className="text-lg font-semibold mb-3 text-slate-300">About</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {profile.bio || 'This user has not written a bio yet.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
