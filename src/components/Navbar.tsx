import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, isLoggedIn, userName, logOut } = useAuth();
    const isDark = theme === 'dark';

    return (
        <nav className={`flex items-center justify-between px-8 py-6 border-b backdrop-blur-md sticky top-0 z-50 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-sky-500/20">
                    S
                </div>
                <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-white to-gray-400' : 'from-gray-900 to-gray-600'}`}>
                    StructLabs
                </span>
            </Link>

            <div className={`hidden md:flex space-x-8 text-sm font-medium ${isDark ? 'text-platinum/70' : 'text-gray-600'}`}>
                <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
                <Link to="/algorithms" className="hover:text-sky-500 transition-colors">Algorithms</Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors">GitHub</a>
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full" />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold">
                                    {userName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                            <span className={`text-sm font-medium max-w-[100px] truncate ${isDark ? 'text-white' : 'text-gray-700'}`}>
                                {userName || 'User'}
                            </span>
                        </div>
                        <button
                            onClick={logOut}
                            className={`p-2 rounded-lg transition-all hover:bg-red-500/10 text-red-500`}
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/signin"
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${isDark
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                    >
                        <span>Sign In</span>
                    </Link>
                )}

                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all hover:scale-105 ${isDark
                        ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
