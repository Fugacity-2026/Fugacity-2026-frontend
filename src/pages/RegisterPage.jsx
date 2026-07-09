import { useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPages.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkCanvas from "../components/NetworkCanvas";
import { setUserToken } from "../utils/userAuth";

const API_URL = import.meta.env.VITE_API_URL;

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const LEVEL_OPTIONS = ["High School", "Undergraduate", "Postgraduate", "PhD", "Other"];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  college: "",
  collegeCity: "",
  collegeState: "",
  collegeRollNo: "",
  levelOfStudy: "",
  password: "",
  confirmPassword: "",
};

const STEP_TITLES = ["Personal Details", "Contact Details", "College Details", "Complete Registration"];

function StepIndicator({ step }) {
  return (
    <div className="auth-steps">
      {[1, 2, 3, 4].map((n) => (
        <Fragment key={n}>
          <div className={`auth-step-dot ${step === n ? "active" : step > n ? "done" : ""}`}>
            {n}
          </div>
          {n < 4 && <div className={`auth-step-line ${step > n ? "done" : ""}`} />}
        </Fragment>
      ))}
    </div>
  );
}

function EmailConfirmModal({ email, onConfirm, onEdit }) {
  return (
    <div className="auth-modal-overlay" onClick={onEdit}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <p className="auth-modal-eyebrow">Confirm your email</p>
        <p className="auth-modal-text">
          Once you register, this email <strong>cannot be changed later</strong> — it's what you'll use to log in. Please make sure it's correct.
        </p>
        <p className="auth-modal-email">{email}</p>
        <p className="auth-modal-text">Are you sure this is your email?</p>
        <div className="auth-modal-actions">
          <button type="button" className="auth-btn-secondary" onClick={onEdit}>
            Edit Email
          </button>
          <button type="button" className="auth-btn-primary" onClick={onConfirm}>
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validateStep = (s) => {
    if (s === 1) {
      if (!form.firstName.trim()) return "First name is required.";
      if (!form.dateOfBirth) return "Date of birth is required.";
      if (!form.gender) return "Select a gender.";
    }
    if (s === 2) {
      if (!form.email.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email address.";
      if (!form.phone.trim()) return "Phone number is required.";
    }
    if (s === 3) {
      if (!form.college.trim()) return "College/school name is required.";
      if (!form.collegeCity.trim()) return "City is required.";
      if (!form.collegeState.trim()) return "State is required.";
      if (!form.levelOfStudy) return "Select a level of study.";
    }
    if (s === 4) {
      if (!form.password) return "Password is required.";
      if (form.password.length < 6) return "Password must be at least 6 characters.";
      if (form.password !== form.confirmPassword) return "Passwords do not match.";
    }
    return "";
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleConfirmEmail = () => {
    setShowEmailConfirm(false);
    setStep((s) => s + 1);
  };

  const handleEditEmail = () => {
    setShowEmailConfirm(false);
  };

  const handleContinue = async () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (step === 2) {
      setShowEmailConfirm(true);
      return;
    }

    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim() || undefined,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          email: form.email.trim(),
          phone: form.phone.trim(),
          college: form.college.trim(),
          collegeCity: form.collegeCity.trim(),
          collegeState: form.collegeState.trim(),
          collegeRollNo: form.collegeRollNo.trim() || undefined,
          levelOfStudy: form.levelOfStudy,
          password: form.password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
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
          <div className="auth-card">
            <div className="auth-toggle-wrap">
              <div className="auth-toggle">
                <Link to="/login">Login</Link>
                <Link to="/register" className="active">Register</Link>
              </div>
            </div>

            <h1 className="auth-title">{STEP_TITLES[step - 1]}</h1>
            <p className="auth-subtitle">Fields marked with * are required.</p>

            <StepIndicator step={step} />

            {error && <p className="auth-error">{error}</p>}

            {step === 1 && (
              <>
                <div className="auth-field-row">
                  <div className="auth-field">
                    <label>First Name <span className="req">*</span></label>
                    <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="First Name" autoFocus />
                  </div>
                  <div className="auth-field">
                    <label>Last Name</label>
                    <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Last Name" />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Date of Birth <span className="req">*</span></label>
                  <input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} />
                </div>
                <div className="auth-field">
                  <label>Gender <span className="req">*</span></label>
                  <select value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="auth-field">
                  <label>Email Address <span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoFocus />
                </div>
                <div className="auth-field">
                  <label>Phone Number <span className="req">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile number" />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="auth-field">
                  <label>School/College Name <span className="req">*</span></label>
                  <input type="text" value={form.college} onChange={(e) => update("college", e.target.value)} placeholder="e.g. IIT Kharagpur" autoFocus />
                </div>
                <div className="auth-field-row">
                  <div className="auth-field">
                    <label>City <span className="req">*</span></label>
                    <input type="text" value={form.collegeCity} onChange={(e) => update("collegeCity", e.target.value)} placeholder="City" />
                  </div>
                  <div className="auth-field">
                    <label>State <span className="req">*</span></label>
                    <input type="text" value={form.collegeState} onChange={(e) => update("collegeState", e.target.value)} placeholder="State" />
                  </div>
                </div>
                <div className="auth-field-row">
                  <div className="auth-field">
                    <label>College Roll No.</label>
                    <input type="text" value={form.collegeRollNo} onChange={(e) => update("collegeRollNo", e.target.value)} placeholder="Optional" />
                  </div>
                  <div className="auth-field">
                    <label>Level of Study <span className="req">*</span></label>
                    <select value={form.levelOfStudy} onChange={(e) => update("levelOfStudy", e.target.value)}>
                      <option value="">Select level</option>
                      {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="auth-field">
                  <label>Password <span className="req">*</span></label>
                  <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 6 characters" autoFocus />
                </div>
                <div className="auth-field">
                  <label>Confirm Password <span className="req">*</span></label>
                  <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Re-enter password" />
                </div>
              </>
            )}

            <div className="auth-actions">
              {step > 1 && (
                <button type="button" className="auth-btn-secondary" onClick={handleBack} disabled={isSubmitting}>
                  Back
                </button>
              )}
              <button type="button" className="auth-btn-primary" onClick={handleContinue} disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : step === 4 ? "Complete Registration" : "Continue"}
              </button>
            </div>

            <p className="auth-hint">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
      {showEmailConfirm && (
        <EmailConfirmModal
          email={form.email.trim()}
          onConfirm={handleConfirmEmail}
          onEdit={handleEditEmail}
        />
      )}
    </div>
  );
}
