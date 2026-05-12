import { useState } from "react";

const SITE = "https://www.filamentservices.org";
const LOGO = `${SITE}/wp-content/uploads/2020/02/Filament-horiz_3C.png`;
const FOOTER_LOGO = `${SITE}/wp-content/uploads/2020/05/Filament_RevColor_CMYK-essSvcs.png`;
const NAM_LOGO = `${SITE}/wp-content/uploads/NAM-Member-Logo-white-RGB-sm.png`;

const NAV = [
  { label: "Home", href: SITE },
  {
    label: "Services", href: "#", children: [
      {
        label: "IT & Security", children: [
          { label: "Technology Services", href: `${SITE}/technology-services/` },
          { label: "Windows 11 Upgrade Support", href: `${SITE}/windows-11/` },
          { label: "Information Security", href: "https://www.filamentsecurity.org/" },
        ]
      },
      {
        label: "Operations", children: [
          { label: "AI Training", href: `${SITE}/ai-training/` },
          { label: "Marketing Strategy", href: `${SITE}/marketing-strategy/` },
          { label: "Human Resources", href: `${SITE}/human-resources/` },
          { label: "Payroll & Bookkeeping", href: `${SITE}/payroll-and-bookkeeping/` },
        ]
      },
      {
        label: "Creative Services", children: [
          { label: "Branding Services", href: `${SITE}/branding-services/` },
          { label: "Design and Printing", href: `${SITE}/design-printing/` },
          { label: "SOCS Web Platform", href: `${SITE}/socs-web-platform/` },
          { label: "Video Production", href: `${SITE}/video-production/` },
        ]
      },
    ]
  },
  {
    label: "Resources", href: "#", children: [
      { label: "Free Resource Hub", href: `${SITE}/free-resource-hub/` },
      { label: "AI Savings Calculator", href: `${SITE}/ai-calculator/` },
      { label: "Bookkeeping Savings Calculator", href: `${SITE}/bookkeeping-savings-calculator/` },
      { label: "Knowledge Center", href: `${SITE}/blog/` },
    ]
  },
  {
    label: "About", href: `${SITE}/about/`, children: [
      { label: "About Filament", href: `${SITE}/about/` },
      { label: "Nonprofit Advocate", href: `${SITE}/nonprofit-advocate/` },
      { label: "News", href: `${SITE}/news/` },
      { label: "Careers", href: `${SITE}/careers/` },
    ]
  },
];

const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/filamentsvcs", icon: "f" },
  { label: "Instagram", href: "https://www.instagram.com/filamentsvcs/", icon: "i" },
  { label: "LinkedIn", href: "http://www.linkedin.com/company/filamentsvcs", icon: "in" },
  { label: "Youtube", href: "https://www.youtube.com/channel/UCgIlR9Kn2mMxY7CZCsrqfoQ", icon: "yt" },
  { label: "Vimeo", href: "https://vimeo.com/filamentsvcs", icon: "v" },
];

function TopBar() {
  return (
    <div style={{
      backgroundColor: "#001e46", padding: "8px 24px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 8,
    }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
        <a href="tel:+18008508397" style={{ color: "#ffffff", textDecoration: "none" }}>800.850.8397</a>
        <a href="mailto:info@filamentservices.org" style={{ color: "#00adb0", textDecoration: "none" }}>info@filamentservices.org</a>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {SOCIAL.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{
              color: "#ffffff", textDecoration: "none", fontSize: 11,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%",
              width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
            }}
            title={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href={item.href} style={{
        color: "#001e46", textDecoration: "none", fontSize: 14, fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif", padding: "8px 0",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {item.label}
        {item.children && <span style={{ fontSize: 10 }}>▼</span>}
      </a>
      {item.children && open && (
        <div style={{
          position: "absolute", top: "100%", left: 0,
          backgroundColor: "#ffffff", border: "1px solid #E8EAED",
          borderRadius: 6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          minWidth: 220, zIndex: 1000, padding: "8px 0",
        }}>
          {item.children.map((child, i) => (
            <div key={i}>
              {child.href ? (
                <a href={child.href} style={{
                  display: "block", padding: "8px 20px", fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif", color: "#001e46",
                  textDecoration: "none",
                }}>
                  {child.label}
                </a>
              ) : (
                <div style={{ padding: "10px 20px 4px", fontSize: 11, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: 1, color: "#00adb0",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {child.label}
                </div>
              )}
              {child.children && child.children.map((sub, j) => (
                <a key={j} href={sub.href} style={{
                  display: "block", padding: "6px 20px 6px 32px", fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif", color: "#374151",
                  textDecoration: "none",
                }}>
                  {sub.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      <TopBar />
      <div style={{
        backgroundColor: "#ffffff", padding: "12px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid #E8EAED", position: "relative",
      }}>
        <a href={SITE}>
          <img src={LOGO} alt="Filament Essential Services" style={{ height: 40 }} />
        </a>

        {/* Desktop nav */}
        <nav style={{
          display: "flex", gap: 28, alignItems: "center",
        }}>
          {NAV.map((item, i) => (
            <NavDropdown key={i} item={item} />
          ))}
        </nav>

        {/* Mobile hamburger - simplified */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none", background: "none", border: "none",
            fontSize: 24, cursor: "pointer", color: "#001e46",
          }}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#001e46", color: "#ffffff", padding: "48px 24px 24px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40,
      }}>
        {/* Logo & Contact */}
        <div>
          <a href={SITE}>
            <img src={FOOTER_LOGO} alt="Filament Essential Services" style={{ height: 50, marginBottom: 16 }} />
          </a>
          <p style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, color: "#bebebe", margin: "0 0 8px" }}>
            1300 O Street<br />Lincoln, NE 68508
          </p>
          <p style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8, margin: 0 }}>
            <a href="tel:+18008508397" style={{ color: "#ffffff", textDecoration: "none" }}>800.850.8397</a><br />
            <a href="tel:+14022199600" style={{ color: "#ffffff", textDecoration: "none" }}>402.219.9600</a><br />
            <a href="mailto:info@filamentservices.org" style={{ color: "#00adb0", textDecoration: "none" }}>info@filamentservices.org</a>
          </p>
          <div style={{ marginTop: 16 }}>
            <a href="https://www.nonprofitam.org/" target="_blank" rel="noopener noreferrer">
              <img src={NAM_LOGO} alt="NAM Member" style={{ height: 40 }} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, marginBottom: 12, color: "#ffffff" }}>Services</h4>
          {[
            { label: "Marketing Strategy", href: `${SITE}/marketing-strategy/` },
            { label: "Design and Printing", href: `${SITE}/design-printing/` },
            { label: "Branding Services", href: `${SITE}/branding-services/` },
            { label: "Video Production", href: `${SITE}/video-production/` },
            { label: "AI Training", href: `${SITE}/ai-training/` },
            { label: "Technology Services", href: `${SITE}/technology-services/` },
            { label: "Windows 11 Upgrade Support", href: `${SITE}/windows-11/` },
            { label: "Information Security", href: "https://www.filamentsecurity.org/" },
            { label: "Payroll and Bookkeeping", href: `${SITE}/payroll-and-bookkeeping/` },
            { label: "Human Resources", href: `${SITE}/human-resources/` },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: "block", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              color: "#bebebe", textDecoration: "none", padding: "3px 0",
            }}>{link.label}</a>
          ))}
        </div>

        {/* About */}
        <div>
          <h4 style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, marginBottom: 12, color: "#ffffff" }}>About</h4>
          {[
            { label: "About Filament", href: `${SITE}/about/` },
            { label: "Nonprofit Advocate", href: `${SITE}/nonprofit-advocate/` },
            { label: "News", href: `${SITE}/news/` },
            { label: "Careers", href: `${SITE}/careers/` },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: "block", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              color: "#bebebe", textDecoration: "none", padding: "3px 0",
            }}>{link.label}</a>
          ))}

          <h4 style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, marginTop: 24, marginBottom: 12, color: "#ffffff" }}>Resources</h4>
          {[
            { label: "Free Resource Hub", href: `${SITE}/free-resource-hub/` },
            { label: "Nonprofit Health Check", href: `${SITE}/nonprofit-health-check/` },
            { label: "Knowledge Center", href: `${SITE}/blog/` },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              display: "block", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              color: "#bebebe", textDecoration: "none", padding: "3px 0",
            }}>{link.label}</a>
          ))}
        </div>
      </div>

      {/* Social & Copyright */}
      <div style={{
        maxWidth: 1200, margin: "32px auto 0", paddingTop: 20,
        borderTop: "1px solid rgba(255,255,255,0.15)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", gap: 12 }}>
          {SOCIAL.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{
                color: "#ffffff", textDecoration: "none", fontSize: 11,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%",
                width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
              }}
              title={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p style={{
          fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#bebebe", margin: 0,
        }}>
          ©2024 Filament Essential Services •{" "}
          <a href={`${SITE}/privacypolicy/`} style={{ color: "#bebebe", textDecoration: "none" }}>Privacy Pledge</a> •{" "}
          <a href={`${SITE}/accessibilitystatement/`} style={{ color: "#bebebe", textDecoration: "none" }}>Accessibility Statement</a>
        </p>
      </div>
    </footer>
  );
}

export function SiteHeader() { return <Header />; }
export function SiteFooter() { return <Footer />; }
