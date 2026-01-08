import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HireCRE",
  description: "Commercial real estate job board (MVP)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="nav">
            <div className="row" style={{ gap: 10 }}>
              <div className="brand">HireCRE</div>
              <div className="badge">MVP</div>
            </div>
            <div className="navlinks">
              <a className="badge" href="/">Home</a>
              <a className="badge" href="/board">Jobs</a>
              <a className="badge" href="/login">Login</a>
              <a className="badge" href="/signup">Sign up</a>
            </div>
          </div>
          <div className="spacer" />
          {children}
          <div className="spacer" />
          <div className="small">
            Built for: hirecre.com • Auth + DB: Supabase • Hosting: Coolify
          </div>
        </div>
      </body>
    </html>
  );
}
