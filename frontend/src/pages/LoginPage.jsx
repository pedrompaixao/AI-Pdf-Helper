import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import StatusFooter from "../components/StatusFooter";
import { loginUser } from "../api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setStatus("Logging in...");
        const data = await loginUser(email, password);
        if (data.error) {
            setStatus(data.error || "Login failed.");
            return;
        }

        setEmail("");
        setPassword("");
        setStatus("Login successful.");
        // Store token and user in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        // Navigate to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="app-shell auth-form">
            <header>
                <h1>AI-Pdf-Helper</h1>
                <p>Upload a PDF, extract text, summarize it, and ask questions.</p>
            </header>

            <LoginForm
                email={email}
                password={password}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={handleLogin}
                onSwitchToSignup={() => navigate("/signup")}
            />

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>

            <StatusFooter status={status} />
        </div>
    );
}

export default LoginPage;