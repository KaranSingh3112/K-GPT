import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import toast from "react-hot-toast";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister() {
        if (!username || !email || !password) {
            toast.error("Please fill in all fields")
            return;
        }

        if (password.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:8080/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();
            if (response.ok) {
                toast.success("Registration successful! Please log in.");
                navigate("/login");
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during registration");
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header">
                    <div className="register-logo">K</div>
                    <h1 className="register-title">K-GPT</h1>
                    <p className="register-subtitle">Create your account</p>
                </div>

                <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <div className="register-footer">
                    Already have an account? <a href="/login">Log in</a>
                </div>
            </div>
        </div>
    );
}
