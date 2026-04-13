import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import StatusFooter from "../components/StatusFooter";
import { loginUser, signupUser } from "../api";

function AuthPage({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = async () => {
        setStatus("Logging in...");
        const data = await loginUser(email, password);
        if (data.error) {
            setStatus(data.error || "Login failed.");
            return;
        }

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setStatus("Login successful.");
        onLoginSuccess(data.token, data.user);
    };

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
        setShowSignup(false);
        setStatus("Signup successful. Logging you in...");
        onLoginSuccess(data.token, data.user);
    };

    return (
        <div className="app-shell auth-form">
            <header>
                <h1>AI-Pdf-Helper</h1>
                <p>Upload a PDF, extract text, summarize it, and ask questions.</p>
            </header>

            {showSignup ? (
                <SignupForm
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                    onSubmit={handleSignup}
                    onSwitchToLogin={() => setShowSignup(false)}
                />
            ) : (
                <LoginForm
                    email={email}
                    password={password}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onSubmit={handleLogin}
                    onSwitchToSignup={() => setShowSignup(true)}
                />
            )}

            <StatusFooter status={status} />
        </div>
    );
}

export default AuthPage;
