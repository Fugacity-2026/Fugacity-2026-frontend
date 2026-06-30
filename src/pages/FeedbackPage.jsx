import  { useState } from "react";
import './FeedbackPage.css';
import MoleculeBackground from '../components/MoleculeBackground';


/**
 * Fugacity Feedback Form
 * Annual tech fest — Department of Chemical Engineering
 *
 * Design direction: grounded in the chemical engineering world —
 * lab-report vocabulary, process-sheet structure, a flask-fill rating
 * control standing in for stars. "Fugacity" itself is a real
 * thermodynamics term (a substance's escaping tendency relative to an
 * ideal gas) — referenced quietly in the header rather than explained,
 * for anyone in the department who'll recognize it.
 */

const EVENTS = [
  "Process Simulation Challenge",
  "Reaction Engineering Hackathon",
  "Plant Design Sprint",
  "Robotics & Automation Arena",
  "Coding Marathon",
  "Technical Paper Presentation",
  "Workshop Series",
  "Cultural Night",
];

const HEAR_ABOUT_OPTIONS = [
  "Social media",
  "Friend",
  "WhatsApp group",
  "Posters",
];

const CATEGORY_OPTIONS = [
  "IIT KGP student",
  "Other college student",
  "Alumni",
];

/* Flask-fill rating: liquid level rises with each tick, like a
   graduated cylinder. Stands in for the brief's 1–5 rating sketch. */
function FlaskRating({ value, onChange, name }) {
  const levels = [1, 2, 3, 4, 5];
  return (
    <div className="flask-row" role="radiogroup" aria-label={name}>
      {levels.map((n) => {
        const filled = value >= n;
        return (
          <button
            type="button"
            key={n}
            className={`flask-btn ${filled ? "flask-filled" : ""}`}
            onClick={() => onChange(n)}
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} of 5`}
          >
            <svg viewBox="0 0 24 30" className="flask-svg" aria-hidden="true">
              <path
                className="flask-outline"
                d="M9 2H15V9.5L20.5 22.5C21.3 24.5 19.8 27 17.6 27H6.4C4.2 27 2.7 24.5 3.5 22.5L9 9.5V2Z"
              />
              {filled && (
                <path
                  className="flask-liquid"
                  d="M5.5 23C5.1 24 5.9 25.2 7 25.2H17C18.1 25.2 18.9 24 18.5 23L16.3 17.5H7.7L5.5 23Z"
                />
              )}
            </svg>
            <span className="flask-num">{n}</span>
          </button>
        );
      })}
    </div>
  );
}

function RatingField({ label, value, onChange, name }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <FlaskRating value={value} onChange={onChange} name={name} />
    </div>
  );
}

function CheckboxGroup({ options, selected, onToggle, name }) {
  return (
    <div className="tag-group" role="group" aria-label={name}>
      {options.map((opt) => (
        <label key={opt} className="tag-pill">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

const INITIAL_FORM = {
  name: "",
  email: "",
  category: "",
  collegeName: "",
  hearAbout: [],
  eventsAttended: [],
  problemStatementRating: 0,
  schedulingRating: 0,
  helpfulnessRating: 0,
  venueRating: 0,
  highlight: "",
  challenges: "",
};

export default function FugacityFeedbackForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleInArray = (key, value) => {
    setForm((f) => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("Registered email is required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (!form.category) {
      setError("Select a participant category.");
      return;
    }
    if (form.category === "Other college student" && !form.collegeName.trim()) {
      setError("Enter the name of your college.");
      return;
    }

    setError("");
    setSubmitted(true);
    // axios.post("/api/feedback", form);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setError("");
  };

  if (submitted) {
    return (
      <div className="fug-page">
        <div className="fug-card success-card">
          <svg viewBox="0 0 24 30" className="success-flask" aria-hidden="true">
            <path
              className="flask-outline"
              d="M9 2H15V9.5L20.5 22.5C21.3 24.5 19.8 27 17.6 27H6.4C4.2 27 2.7 24.5 3.5 22.5L9 9.5V2Z"
            />
            <path
              className="flask-liquid"
              d="M5 22.5C4.5 23.8 5.4 25.2 6.7 25.2H17.3C18.6 25.2 19.5 23.8 19 22.5L16.3 16H7.7L5 22.5Z"
            />
          </svg>
          <h2>Logged, {form.name.split(" ")[0]}.</h2>
          <p>Your feedback for Fugacity has been recorded. Thanks for the input.</p>
          <button
            type="button"
            className="reset-btn success-reset"
            onClick={() => {
              handleReset();
              setSubmitted(false);
            }}
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fug-page">
      <MoleculeBackground />
      <form className="fug-card" onSubmit={handleSubmit}>
        <header className="form-header">
          <p className="eyebrow">Dept. of Chemical Engineering &middot; Annual Tech Fest</p>
          <h1>Fugacity feedback</h1>
          <p className="subhead">
            Fugacity: a substance's tendency to escape its current state. Tell us
            how this year's fest measured up.
          </p>
        </header>

        <section className="section">
          <p className="section-label">01 &mdash; Participant data</p>
          <div className="field">
            <label className="field-label" htmlFor="name">
              Name <span className="required-mark">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="text-input"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="email">
              Registered email <span className="required-mark">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="text-input"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label className="field-label">
              Category <span className="required-mark">*</span>
            </label>
            <div className="tag-group">
              {CATEGORY_OPTIONS.map((opt) => (
                <label key={opt} className="tag-pill radio-pill">
                  <input
                    type="radio"
                    name="category"
                    value={opt}
                    checked={form.category === opt}
                    onChange={() => {
                      update("category", opt);
                      if (opt !== "Other college student") {
                        update("collegeName", "");
                      }
                    }}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {form.category === "Other college student" && (
              <div className="field conditional-field">
                <label className="field-label" htmlFor="collegeName">
                  Name of your college <span className="required-mark">*</span>
                </label>
                <input
                  id="collegeName"
                  type="text"
                  className="text-input"
                  value={form.collegeName}
                  onChange={(e) => update("collegeName", e.target.value)}
                  placeholder="e.g. NIT Durgapur"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="field">
            <label className="field-label">How did you hear about Fugacity?</label>
            <CheckboxGroup
              options={HEAR_ABOUT_OPTIONS}
              selected={form.hearAbout}
              onToggle={(v) => toggleInArray("hearAbout", v)}
              name="hear-about"
            />
          </div>
        </section>

        <section className="section">
          <p className="section-label">02 &mdash; Event log</p>
          <div className="field">
            <label className="field-label">Which event(s) did you participate in?</label>
            <CheckboxGroup
              options={EVENTS}
              selected={form.eventsAttended}
              onToggle={(v) => toggleInArray("eventsAttended", v)}
              name="events-attended"
            />
          </div>

          <RatingField
            label="Quality of the problem statement"
            value={form.problemStatementRating}
            onChange={(v) => update("problemStatementRating", v)}
            name="problem-statement-rating"
          />
        </section>

        <section className="section">
          <p className="section-label">03 &mdash; Process rating</p>
          <RatingField
            label="Smoothness of event scheduling and timing"
            value={form.schedulingRating}
            onChange={(v) => update("schedulingRating", v)}
            name="scheduling-rating"
          />

          <RatingField
            label="Helpfulness of the organising team / volunteers"
            value={form.helpfulnessRating}
            onChange={(v) => update("helpfulnessRating", v)}
            name="helpfulness-rating"
          />

          <RatingField
            label="Venue arrangements, accommodation, and hospitality"
            value={form.venueRating}
            onChange={(v) => update("venueRating", v)}
            name="venue-rating"
          />
        </section>

        <section className="section">
          <p className="section-label">04 &mdash; Observations</p>
          <div className="field">
            <label className="field-label" htmlFor="highlight">
              Best highlight, moment, or event of this year's Fugacity
            </label>
            <textarea
              id="highlight"
              className="textarea-input"
              rows={4}
              value={form.highlight}
              onChange={(e) => update("highlight", e.target.value)}
              placeholder="What stood out..."
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="challenges">
              Major issues, delays, or challenges faced
            </label>
            <textarea
              id="challenges"
              className="textarea-input"
              rows={4}
              value={form.challenges}
              onChange={(e) => update("challenges", e.target.value)}
              placeholder="Help us improve next year..."
            />
          </div>
        </section>

        {error && <div className="form-error">{error}</div>}

        <div className="btn-row">
          <button type="submit" className="submit-btn">Submit feedback</button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

