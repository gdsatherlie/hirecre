import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "HireCRE",
  description: "Commercial real estate jobs in one clean feed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Minimal site-wide header */}
        <header className="hc-header">
          <div className="hc-header-inner">
            <Link href="/" className="hc-logo">
              HireCRE
            </Link>
            <nav className="hc-nav">
              <Link className="hc-navlink" href="/board">Jobs</Link>
              <Link className="hc-navlink" href="/about">About</Link>
              <Link className="hc-navlink" href="/contact">Contact</Link>
              <Link className="hc-navlink" href="/login">Login</Link>
            </nav>
          </div>
        </header>

        {children}

        {/* Quick SEO win: footer with trust links + contact */}
        <footer className="hc-footer">
          <div className="hc-footer-inner">
            <div>
              <strong>HireCRE</strong>
              <div className="hc-muted">Contact: <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a></div>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
