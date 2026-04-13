import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("authToken") || "");
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("authUser");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("authUser", JSON.stringify(user));
        }
    }, [user]);

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        setToken("");
        setUser(null);
    };

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: Boolean(token),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}