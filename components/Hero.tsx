import Link from "next/link";
import Logo from "./Logo";
import CricketArt from "./CricketArt";
import { UserPlusIcon, DocumentIcon, MapPinIcon } from "./Icons";
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-crest-mobile">
            <Logo size={90} />
          </div>
          <div className="hero-crest-desktop">
            <Logo size={130} />
          </div>
          <p className="hero-eyebrow">
            DISCIPLINE <span className="dot" /> SKILLS <span className="dot" /> TEAMWORK
          </p>
          <h1 id="hero-heading" className="hero-title">
            <span className="text-gold">DAWN</span> CRICKET CLUB
          </h1>
          <p className="hero-loc">DKK | Nowshera, Khyber Pakhtunkhwa, Pakistan</p>
          <p className="hero-tagline">Building Future Champions</p>
          <p className="hero-desc">
            DAWN Cricket Club (DKK) is committed to promoting cricket, developing
            talent and providing a professional platform for young players in
            Nowshera and beyond.
          </p>
          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary btn-lg">
              <UserPlusIcon size={18} />
              Register Now
            </Link>
            <Link href="/register/status-check" className="btn btn-outline btn-lg">
              <DocumentIcon size={18} />
              Check Registration Status
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="hero-right">
          <CricketArt />
          {/* Play / Learn / Grow — 3 separate lines */}
          <div className="hero-script" aria-hidden="true">
            <span className="script-line script-play">Play</span>
            <span className="script-line script-learn">Learn</span>
            <span className="script-line script-grow">Grow</span>
          </div>
          <div className="hero-location">
            <MapPinIcon size={18} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
              <strong style={{ color: "#fff", fontSize: ".8rem" }}>Hakeemabad, Nowshera</strong>
              <span style={{ color: "rgba(238,244,251,.65)", fontSize: ".7rem" }}>Khyber Pakhtunkhwa, Pakistan</span>
            </div>
          </div>
        </div>
      </div>
      {/* Inline fix for script and location */}
      <style>{`
        .hero-script {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: .15rem;
          pointer-events: none;
          text-shadow: 0 2px 24px rgba(240,180,41,0.35);
        }
        .hero-script .script-line {
          display: block;
          font-family: "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive;
          font-size: clamp(1.3rem, 3.6vw, 2.5rem);
          line-height: 1;
        }
        .hero-script .script-play { color: #f7c948; transform: rotate(-3deg); }
        .hero-script .script-learn { color: #ffffff; transform: rotate(-1deg); }
        .hero-script .script-grow { color: #f7c948; transform: rotate(2deg); }
        .hero-location {
          position: absolute;
          bottom: 0.25rem;
          right: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.85rem;
          border-radius: 0.7rem;
          background: rgba(3,10,24,0.88);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 10px 40px -12px rgba(0,0,0,0.5);
          max-width: 240px;
        }
        .hero-location svg { flex-shrink: 0; color: #f0b429; }
      `}</style>
    </section>
  );
}