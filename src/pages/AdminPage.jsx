import { useCallback, useEffect, useState } from "react";
import "./AdminPage.css";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "fugacity_admin_token";

function formatDateTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatEventDate(value) {
  if (!value) return "TBD";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "TBD";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function ratingsSummary(f) {
  return [
    ["P", f.qualityOfProblemStatement],
    ["S", f.smoothnessOfScheduling],
    ["H", f.helpfulnessOfTeam],
    ["V", f.venueArrangements],
  ]
    .map(([label, val]) => `${label}:${val ?? "–"}`)
    .join("  ");
}

/** Fetches an admin-protected resource; logs the session out on 401/403. */
function useAdminResource(path, token, onUnauthorized) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    setError("");

    fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          onUnauthorized();
          return;
        }
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body.message || `Request failed (${res.status})`);
        }
        if (!cancelled) setData(body);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load this section.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path, token, onUnauthorized]);

  return { data, loading, error };
}

function LoginGate({ onSubmit, isSubmitting, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="admin-login-wrap">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">Restricted access</p>
        <h1>Admin Console</h1>
        <p className="admin-login-note">Fugacity 2026 · Internal ops dashboard</p>

        <div className="admin-field">
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            autoFocus
          />
        </div>

        <div className="admin-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="admin-login-error">{error}</p>}

        <button type="submit" className="admin-login-btn" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Enter console"}
        </button>
      </form>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label">{label}</div>
    </div>
  );
}

function SectionHeader({ tag, title }) {
  return (
    <div className="admin-section-header">
      <div>
        <p className="admin-eyebrow">{tag}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function SectionStatus({ loading, error }) {
  if (loading) return <p className="admin-loading">Loading…</p>;
  if (error) return <p className="admin-section-error">{error}</p>;
  return null;
}

function EventWiseTable({ rows }) {
  return (
    <table className="admin-table">
      <thead>
        <tr><th>Event</th><th>Registrations</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.eventId}>
            <td>{r.eventName}</td>
            <td>{r.count}</td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={2} className="admin-empty-row">No registrations yet.</td></tr>
        )}
      </tbody>
    </table>
  );
}

function ParticipantsTable({ rows }) {
  return (
    <table className="admin-table">
      <thead>
        <tr><th>Name</th><th>Phone</th><th>Team</th><th>Teammates</th><th>Event</th><th>Registered</th></tr>
      </thead>
      <tbody>
        {rows.map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.phone || "-"}</td>
            <td>{p.teamName}</td>
            <td>{p.teammates}</td>
            <td>{p.event || "-"}</td>
            <td>{formatDateTime(p.registeredAt)}</td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={6} className="admin-empty-row">No participants for this event.</td></tr>
        )}
      </tbody>
    </table>
  );
}

function EventsTable({ rows }) {
  return (
    <table className="admin-table">
      <thead>
        <tr><th>Name</th><th>Category</th><th>Date</th><th>Venue</th><th>Max</th></tr>
      </thead>
      <tbody>
        {rows.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.category || "-"}</td>
            <td>{formatEventDate(e.date)}</td>
            <td>{e.venue || "-"}</td>
            <td>{e.maxParticipants ?? "-"}</td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={5} className="admin-empty-row">No events yet.</td></tr>
        )}
      </tbody>
    </table>
  );
}

function FeedbackTable({ rows }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Category</th><th>Events Attended</th>
          <th>Ratings</th><th>Highlight</th><th>Issues</th><th>Submitted</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((f) => (
          <tr key={f.id}>
            <td>{f.name}</td>
            <td>{f.email}</td>
            <td>{f.category}{f.collegeName ? ` (${f.collegeName})` : ""}</td>
            <td>{(f.eventsAttended || []).join(", ") || "-"}</td>
            <td className="admin-mono">{ratingsSummary(f)}</td>
            <td>{f.bestHighlight || "-"}</td>
            <td>{f.majorIssues || "-"}</td>
            <td>{formatDateTime(f.createdAt)}</td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={8} className="admin-empty-row">No feedback submitted yet.</td></tr>
        )}
      </tbody>
    </table>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [sessionMsg, setSessionMsg] = useState("");
  const [eventFilter, setEventFilter] = useState("All");

  const handleUnauthorized = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setSessionMsg("Session expired. Please log in again.");
  }, []);

  const handleLogin = async (username, password) => {
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Login failed.");
      }
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setSessionMsg("");
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message || "Couldn't reach the server. Try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const stats = useAdminResource("/api/admin/stats", token, handleUnauthorized);
  const eventWise = useAdminResource("/api/admin/registrations/event-wise", token, handleUnauthorized);
  const events = useAdminResource("/api/events", token, handleUnauthorized);
  const feedback = useAdminResource("/api/admin/feedback", token, handleUnauthorized);

  const participantsPath =
    eventFilter === "All"
      ? "/api/admin/registrations/participants"
      : `/api/admin/registrations/participants?eventId=${encodeURIComponent(eventFilter)}`;
  const participants = useAdminResource(participantsPath, token, handleUnauthorized);

  if (!token) {
    return <LoginGate onSubmit={handleLogin} isSubmitting={isLoggingIn} error={loginError || sessionMsg} />;
  }

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Fugacity 2026 · Internal</p>
          <h1>Admin Console</h1>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <section className="admin-stats-row">
        <StatCard label="Total Registrations" value={stats.loading ? "…" : stats.data?.totalRegistrations ?? "—"} />
        <StatCard label="Total Events" value={stats.loading ? "…" : stats.data?.totalEvents ?? "—"} />
      </section>
      {stats.error && <p className="admin-section-error">{stats.error}</p>}

      <section className="admin-section">
        <SectionHeader tag="§01 — Aggregation" title="Event-wise Registrations" />
        <SectionStatus loading={eventWise.loading} error={eventWise.error} />
        {eventWise.data && <EventWiseTable rows={eventWise.data} />}
      </section>

      <section className="admin-section">
        <SectionHeader tag="§02 — Roster" title="Participants" />
        <div className="admin-filter-row">
          <label htmlFor="event-filter">Filter by event</label>
          <select
            id="event-filter"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="All">All events</option>
            {(events.data || []).map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.name}</option>
            ))}
          </select>
        </div>
        <SectionStatus loading={participants.loading} error={participants.error} />
        {participants.data && <ParticipantsTable rows={participants.data} />}
      </section>

      <section className="admin-section">
        <SectionHeader tag="§03 — Catalog" title="Events" />
        <SectionStatus loading={events.loading} error={events.error} />
        {events.data && <EventsTable rows={events.data} />}
      </section>

      <section className="admin-section">
        <SectionHeader tag="§04 — Sentiment" title="Feedback" />
        <SectionStatus loading={feedback.loading} error={feedback.error} />
        {feedback.data && <FeedbackTable rows={feedback.data} />}
      </section>
    </div>
    </div>
  );
}
