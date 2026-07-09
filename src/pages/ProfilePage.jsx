import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkCanvas from "../components/NetworkCanvas";
import { getUserToken, clearUserToken } from "../utils/userAuth";

const API_URL = import.meta.env.VITE_API_URL;

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [registrations, setRegistrations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      navigate("/login");
      return;
    }

    let cancelled = false;
    const handleUnauthorized = () => {
      clearUserToken();
      navigate("/login");
    };

    Promise.all([
      fetch(`${API_URL}/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API_URL}/api/registrations/my`, { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(async ([profileRes, regRes]) => {
        if (profileRes.status === 401 || regRes.status === 401) {
          handleUnauthorized();
          return;
        }
        const profileData = await profileRes.json().catch(() => ({}));
        const regData = await regRes.json().catch(() => []);
        if (!profileRes.ok) throw new Error(profileData.message || "Couldn't load your profile.");
        if (!regRes.ok) throw new Error(regData.message || "Couldn't load your registrations.");
        if (!cancelled) {
          setProfile(profileData);
          setRegistrations(regData);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Something went wrong.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = () => {
    clearUserToken();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      <NetworkCanvas />
      <Navbar />
      <div className="profile-page">
        <main className="profile-main">
          {loading && <p className="profile-loading">Loading your profile…</p>}

          {!loading && error && <p className="auth-error">{error}</p>}

          {!loading && profile && (
            <>
              <header className="profile-header">
                <div>
                  <p className="profile-eyebrow">Fugacity 2026 · My Account</p>
                  <h1>{profile.firstName} {profile.lastName}</h1>
                </div>
                <button className="profile-logout-btn" onClick={handleLogout}>
                  Log out
                </button>
              </header>

              <section className="profile-section">
                <h2>Personal &amp; College Details</h2>
                <div className="profile-info-grid">
                  <div className="profile-info-item"><label>Email</label><div>{profile.email}</div></div>
                  <div className="profile-info-item"><label>Phone</label><div>{profile.phone || "-"}</div></div>
                  <div className="profile-info-item"><label>Date of Birth</label><div>{formatDate(profile.dateOfBirth)}</div></div>
                  <div className="profile-info-item"><label>Gender</label><div>{profile.gender || "-"}</div></div>
                  <div className="profile-info-item"><label>College</label><div>{profile.college || "-"}</div></div>
                  <div className="profile-info-item"><label>City</label><div>{profile.collegeCity || "-"}</div></div>
                  <div className="profile-info-item"><label>State</label><div>{profile.collegeState || "-"}</div></div>
                  <div className="profile-info-item"><label>Roll No.</label><div>{profile.collegeRollNo || "-"}</div></div>
                  <div className="profile-info-item"><label>Level of Study</label><div>{profile.levelOfStudy || "-"}</div></div>
                </div>
              </section>

              <section className="profile-section">
                <h2>My Event Registrations</h2>
                {registrations && registrations.length === 0 && (
                  <p className="profile-empty">You haven't registered for any events yet.</p>
                )}
                {registrations && registrations.map((r) => (
                  <div className="profile-event-card" key={r.id}>
                    <p className="profile-event-name">{r.Event?.name || "Event"}</p>
                    <div className="profile-event-meta">
                      <span>{formatDate(r.Event?.date)}</span>
                      <span>{r.Event?.venue || "-"}</span>
                      <span>{r.Event?.category || "-"}</span>
                      <span>Team: {r.teamName || "-"}</span>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
