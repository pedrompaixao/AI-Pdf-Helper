import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
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

    const handleLogout = () => {
        setToken("");
        setUser(null);
    };

    const signedIn = Boolean(token);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        signedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <LandingPage />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        signedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <LoginPage />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        signedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <SignupPage />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        signedIn ? (
                            <DashboardPage user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
