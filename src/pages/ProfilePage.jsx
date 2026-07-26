import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkCanvas from "../components/NetworkCanvas";
import { getUserToken, clearUserToken } from "../utils/userAuth";

const API_URL = import.meta.env.VITE_API_URL;

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const LEVEL_OPTIONS = ["High School", "Undergraduate", "Postgraduate", "PhD", "Other"];

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function EditProfileForm({ profile, onCancel, onSaved }) {
  const [form, setForm] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    dateOfBirth: toDateInputValue(profile.dateOfBirth),
    gender: profile.gender || "",
    phone: profile.phone || "",
    college: profile.college || "",
    collegeCity: profile.collegeCity || "",
    collegeState: profile.collegeState || "",
    collegeRollNo: profile.collegeRollNo || "",
    levelOfStudy: profile.levelOfStudy || "",
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim()) return setError("First name is required.");
    if (!form.dateOfBirth) return setError("Date of birth is required.");
    if (!form.gender) return setError("Select a gender.");
    if (!form.phone.trim()) return setError("Phone number is required.");
    if (!form.college.trim()) return setError("College/school name is required.");
    if (!form.collegeCity.trim()) return setError("City is required.");
    if (!form.collegeState.trim()) return setError("State is required.");
    if (!form.levelOfStudy) return setError("Select a level of study.");

    setError("");
    setIsSaving(true);
    try {
      const token = getUserToken();
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim() || undefined,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          phone: form.phone.trim(),
          college: form.college.trim(),
          collegeCity: form.collegeCity.trim(),
          collegeState: form.collegeState.trim(),
          collegeRollNo: form.collegeRollNo.trim() || undefined,
          levelOfStudy: form.levelOfStudy,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Couldn't save your changes.");
      onSaved(data);
    } catch (err) {
      setError(err.message || "Couldn't reach the server. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSave}>
      <div className="profile-edit-field">
        <label>Email</label>
        <input type="email" value={profile.email} disabled />
        <p className="profile-edit-note">Email can't be changed.</p>
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-field">
          <label>First Name *</label>
          <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
        </div>
        <div className="profile-edit-field">
          <label>Last Name</label>
          <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
        </div>
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-field">
          <label>Date of Birth *</label>
          <input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} />
        </div>
        <div className="profile-edit-field">
          <label>Gender *</label>
          <select value={form.gender} onChange={(e) => update("gender", e.target.value)}>
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div className="profile-edit-field">
        <label>Phone Number *</label>
        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      </div>

      <div className="profile-edit-field">
        <label>School/College Name *</label>
        <input type="text" value={form.college} onChange={(e) => update("college", e.target.value)} />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-field">
          <label>City *</label>
          <input type="text" value={form.collegeCity} onChange={(e) => update("collegeCity", e.target.value)} />
        </div>
        <div className="profile-edit-field">
          <label>State *</label>
          <input type="text" value={form.collegeState} onChange={(e) => update("collegeState", e.target.value)} />
        </div>
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-field">
          <label>College Roll No.</label>
          <input type="text" value={form.collegeRollNo} onChange={(e) => update("collegeRollNo", e.target.value)} />
        </div>
        <div className="profile-edit-field">
          <label>Level of Study *</label>
          <select value={form.levelOfStudy} onChange={(e) => update("levelOfStudy", e.target.value)}>
            <option value="">Select level</option>
            {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="profile-edit-error">{error}</p>}

      <div className="profile-edit-actions">
        <button type="button" className="profile-cancel-btn" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
        <button type="submit" className="profile-save-btn" disabled={isSaving}>
          {isSaving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [registrations, setRegistrations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

          {!loading && error && <p className="profile-edit-error">{error}</p>}

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
                <div className="profile-section-header">
                  <h2>Personal &amp; College Details</h2>
                  {!isEditing && (
                    <button type="button" className="profile-edit-btn" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <EditProfileForm
                    profile={profile}
                    onCancel={() => setIsEditing(false)}
                    onSaved={(updated) => {
                      setProfile(updated);
                      setIsEditing(false);
                    }}
                  />
                ) : (
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
                )}
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
