import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import toast from "react-hot-toast";
import API from "../api/axios";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin() {
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const { data } = await API.post("/login", {
                email,
                password
            })
            localStorage.setItem('token', data.token)
            toast.success("Login Successful")
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="login-logo">K</div>
                    <h1 className="login-title">K-GPT</h1>
                    <p className="login-subtitle">Your AI assistant awaits.</p>
                </div>

                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="form-group">
                        <label className="form-label"><i className="fa-solid fa-envelope"></i> Email address</label>
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
                        <label className="form-label"><i className="fa-solid fa-lock"></i> Password</label>
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
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <div className="login-footer">
                    Don't have an account?
                    <Link to="/register">
                        Sign up
                    </Link>

                </div>
            </div>
        </div>
    );
}