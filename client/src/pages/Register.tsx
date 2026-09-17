import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../context/useFetch";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await useFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, phone, password }),
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
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="phone">Phone:</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

                <button type="submit">Register</button>
            </form>

            {error && <p>{error}</p>}

            <p>
                Already have an account <Link to="/login">Login</Link>
            </p>
        </main>
    );
};

export default Register;
