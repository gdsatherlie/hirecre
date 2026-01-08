export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="card">
        <div className="h1">Commercial real estate jobs.</div>
        <p className="p">
          A simple, login-only job board MVP. The goal: drive traffic, collect emails, and later sell ad slots.
        </p>
        <div className="spacer" />
        <div className="row">
          <a className="btn" href="/board">View jobs</a>
          <a className="btn secondary" href="/signup">Create account</a>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Why login?</div>
          <p className="p">
            You capture emails (newsletter later) and can add features like saved jobs, alerts, and recommendations.
          </p>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Next features</div>
          <p className="p">
            Filters (type/location/company), job alerts, sponsor slots, and automated job imports.
          </p>
        </div>
      </div>
    </div>
  );
}
