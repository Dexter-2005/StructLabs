import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
    type User,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';

interface LocalUser {
    displayName: string;
    email: string;
    photoURL?: string;
}

interface RegisteredUser {
    name: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    localUser: LocalUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInLocal: (email: string, password: string) => { success: boolean; error?: string };
    registerLocal: (name: string, email: string, password: string) => { success: boolean; error?: string };
    logOut: () => Promise<void>;
    isLoggedIn: boolean;
    userName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const REGISTERED_USERS_KEY = 'structlabs_registered_users';
const CURRENT_USER_KEY = 'structlabs_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [localUser, setLocalUser] = useState<LocalUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Capture auth locally to allow TS narrowing
    const currentAuth = auth;

    // Helper to get registered users from localStorage
    const getRegisteredUsers = (): RegisteredUser[] => {
        const stored = localStorage.getItem(REGISTERED_USERS_KEY);
        return stored ? JSON.parse(stored) : [];
    };

    // Helper to save registered users to localStorage
    const saveRegisteredUsers = (users: RegisteredUser[]) => {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    };

    useEffect(() => {
        // Check for logged-in local user in localStorage
        const storedUser = localStorage.getItem(CURRENT_USER_KEY);
        if (storedUser) {
            setLocalUser(JSON.parse(storedUser));
        }

        if (!currentAuth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(currentAuth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentAuth]);

    const signInWithGoogle = async () => {
        if (!currentAuth) {
            alert("Firebase Authentication is not configured. Please see src/firebase/firebase.ts");
            return;
        }
        try {
            await signInWithPopup(currentAuth, googleProvider);
            // Clear local user if signing in with Google
            setLocalUser(null);
            localStorage.removeItem(CURRENT_USER_KEY);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    // Register a new local user
    const registerLocal = (name: string, email: string, password: string): { success: boolean; error?: string } => {
        const users = getRegisteredUsers();

        // Check if email already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return { success: false, error: 'An account with this email already exists. Please sign in.' };
        }

        // Add new user
        const newUser: RegisteredUser = { name, email: email.toLowerCase(), password };
        users.push(newUser);
        saveRegisteredUsers(users);

        // Auto sign-in after registration
        const localUserData: LocalUser = {
            displayName: name,
            email: email.toLowerCase(),
            photoURL: undefined
        };
        setLocalUser(localUserData);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(localUserData));

        return { success: true };
    };

    // Sign in with email and password
    const signInLocal = (email: string, password: string): { success: boolean; error?: string } => {
        const users = getRegisteredUsers();

        // Find user by email
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!foundUser) {
            return { success: false, error: 'No account found with this email. Please sign up first.' };
        }

        if (foundUser.password !== password) {
            return { success: false, error: 'Incorrect password. Please try again.' };
        }

        // Success - set as logged in
        const localUserData: LocalUser = {
            displayName: foundUser.name,
            email: foundUser.email,
            photoURL: undefined
        };
        setLocalUser(localUserData);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(localUserData));

        return { success: true };
    };

    const logOut = async () => {
        // Clear local user
        setLocalUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);

        if (!currentAuth) return;
        try {
            await signOut(currentAuth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const isLoggedIn = !!(user || localUser);
    const userName = user?.displayName || localUser?.displayName || null;

    return (
        <AuthContext.Provider value={{ user, localUser, loading, signInWithGoogle, signInLocal, registerLocal, logOut, isLoggedIn, userName }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

