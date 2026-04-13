function LoginForm({ email, password, onEmailChange, onPasswordChange, onSubmit, onSwitchToSignup }) {
    return (
        <section className="card">
            <h2>Login</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                <label htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    placeholder="Enter your email"
                    required
                />

                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit" disabled={!email || !password}>
                    Login
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <button type="button" onClick={onSwitchToSignup}>
                    Sign up
                </button>
            </p>
        </section>
    );
}

export default LoginForm;
