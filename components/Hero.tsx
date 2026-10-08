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
            <Link href="/register?status=check" className="btn btn-outline btn-lg">
              <DocumentIcon size={18} />
              Check Registration Status
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="hero-right">
          <CricketArt />
          <div className="hero-script" aria-hidden="true">
            <span className="s1">Play</span>
            <span className="s2">Learn</span>
            <span className="s3">Grow</span>
          </div>
          <div className="hero-location">
            <MapPinIcon size={18} />
            <div>
              <strong>Hakeemabad, Nowshera</strong>
              <span>Khyber Pakhtunkhwa, Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}