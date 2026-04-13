function SignupForm({ email, password, confirmPassword, onEmailChange, onPasswordChange, onConfirmPasswordChange, onSubmit, onSwitchToLogin }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <section className="card">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup-email">
                    Email
                    <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={onEmailChange}
                        placeholder="Enter your email"
                        required
                    />
                </label>
                <label htmlFor="signup-password">
                    Password
                    <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={onPasswordChange}
                        placeholder="Enter your password"
                        required
                    />
                </label>
                <label htmlFor="signup-confirm-password">
                    Confirm Password
                    <input
                        id="signup-confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                        placeholder="Confirm your password"
                        required
                    />
                </label>
                <button type="submit" disabled={!email || !password || !confirmPassword || password !== confirmPassword}>
                    Sign Up
                </button>
            </form>
            <p>
                Already have an account? <button onClick={onSwitchToLogin} style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}>Login</button>
            </p>
        </section>
    );
}

export default SignupForm;
