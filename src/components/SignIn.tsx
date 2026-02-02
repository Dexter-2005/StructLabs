import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Mail, Lock, LogIn } from 'lucide-react';

const SignIn = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { signInLocal, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Redirect if already logged in
    if (isLoggedIn) {
        navigate('/');
        return null;
    }

    const handleLocalSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }
        if (!password) {
            setError('Please enter your password');
            return;
        }

        const result = signInLocal(email.trim(), password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Sign in failed');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-8 transition-colors duration-300 ${isDark ? 'bg-deep-black' : 'bg-gradient-to-br from-slate-100 via-purple-50 to-cyan-50'}`}>
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-violet-600/30' : 'bg-violet-400/40'}`}></div>
                <div className={`absolute top-1/2 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-cyan-600/20' : 'bg-cyan-400/30'}`} style={{ animationDelay: '1s' }}></div>
                <div className={`absolute -bottom-40 right-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-fuchsia-600/20' : 'bg-fuchsia-400/30'}`} style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Glassmorphism Card */}
            <div className={`relative w-full max-w-md p-8 rounded-3xl border-2 shadow-2xl ${isDark
                ? 'bg-white/10 backdrop-blur-xl border-white/20 shadow-black/20'
                : 'bg-white/60 backdrop-blur-xl border-white/50 shadow-purple-500/10'}`}
                style={{ backdropFilter: 'blur(20px)' }}
            >
                {/* Back button */}
                <Link to="/" className={`absolute top-6 left-6 p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    <ArrowLeft size={20} />
                </Link>

                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">Welcome Back</span>
                    </h1>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Sign in to continue your journey</p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLocalSignIn} className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-gray-400'}`} size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 ${isDark
                                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm'
                                    : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder:text-gray-400 backdrop-blur-sm'}`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40' : 'text-gray-400'}`} size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 ${isDark
                                    ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm'
                                    : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder:text-gray-400 backdrop-blur-sm'}`}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-lg hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <LogIn size={20} /> Sign In
                    </button>
                </form>

                {/* Link to Sign Up */}
                <p className={`text-center text-sm mt-6 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-violet-500 hover:text-violet-400 transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;

