import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPages.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkCanvas from "../components/NetworkCanvas";
import { setUserToken } from "../utils/userAuth";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Login failed.");
      }
      setUserToken(data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Couldn't reach the server. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      <NetworkCanvas />
      <Navbar />
      <div className="auth-page">
        <main className="auth-main">
          <form className="auth-card" onSubmit={handleSubmit}>
            <div className="auth-toggle-wrap">
              <div className="auth-toggle">
                <Link to="/login" className="active">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            </div>

            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Log in to see your registered events.</p>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-field">
              <label>Email Address <span className="req">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
              />
            </div>
            <div className="auth-field">
              <label>Password <span className="req">*</span></label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="auth-actions">
              <button type="submit" className="auth-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Log In"}
              </button>
            </div>

            <p className="auth-hint">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}
