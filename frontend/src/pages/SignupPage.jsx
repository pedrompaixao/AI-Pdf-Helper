import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SignupForm from "../components/SignupForm";
import StatusFooter from "../components/StatusFooter";
import { signupUser } from "../api";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setStatus("Passwords do not match.");
            return;
        }

        setStatus("Signing up...");
        const data = await signupUser(email, password);
        if (data.error) {
            setStatus(data.error || "Signup failed.");
            return;
        }

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setStatus("Signup successful. Logging you in...");
        login(data.token, data.user);
    };

    return (
        <div className="app-shell auth-form">
            <header>
                <h1>AI-Pdf-Helper</h1>
                <p>Upload a PDF, extract text, summarize it, and ask questions.</p>
            </header>

            <SignupForm
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                onSubmit={handleSignup}
                onSwitchToLogin={() => navigate("/login")}
            />

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>

            <StatusFooter status={status} />
        </div>
    );
}

export default SignupPage;