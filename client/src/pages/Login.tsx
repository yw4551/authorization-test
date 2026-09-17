import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../context/useFetch";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await useFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            navigate("/profile");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Registration failed",
            );
        }
    };

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {error && <p>{error}</p>}

            <p>
                Don't have an account <Link to="/register">Register</Link>
            </p>
        </main>
    );
};

export default Login;
