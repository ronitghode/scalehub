import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-3xl space-y-8">
                <h1 className="text-6xl font-extrabold tracking-tight">
                    Scale your app to <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Infinity
                    </span>
                </h1>
                <p className="text-xl text-slate-400">
                    The ultimate microservices platform for real-time applications.
                    Secure, scalable, and production-ready from day one.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="px-8 py-4 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2">
                        Start Building <ArrowRight size={20} />
                    </Link>
                    <a href="#" className="px-8 py-4 bg-slate-800 rounded-full font-bold hover:bg-slate-700 transition">
                        View Documentation
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
                <FeatureCard
                    icon={<Shield className="text-blue-400" size={32} />}
                    title="Secure by Default"
                    description="Enterprise-grade JWT authentication and role-based access control built-in."
                />
                <FeatureCard
                    icon={<Zap className="text-yellow-400" size={32} />}
                    title="Real-Time Performance"
                    description="Lightning fast WebSocket connections for instant data delivery."
                />
                <FeatureCard
                    icon={<Globe className="text-green-400" size={32} />}
                    title="Global Scalability"
                    description="Microservices architecture designed to deploy anywhere, scale everywhere."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

export default LandingPage;
