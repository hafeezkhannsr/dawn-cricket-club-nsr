import {
  UsersGroupIcon,
  ShieldCheckIcon,
  IdCardIcon,
  TrendingIcon,
  TrophyIcon,
} from "./Icons";
const ITEMS = [
  {
    Icon: UsersGroupIcon,
    title: "Professional Registration Process",
    desc: "Simple • Secure • Fast",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Secure Data & Privacy",
    desc: "Your Information is Safe",
  },
  {
    Icon: IdCardIcon,
    title: "Digital Player ID",
    desc: "With QR Verification",
    gold: false,
  },
  {
    Icon: TrendingIcon,
    title: "Track Your Application Status",
    desc: "Real-time Updates",
    gold: true,
  },
  {
    Icon: TrophyIcon,
    title: "Growing Cricket Community",
    desc: "For a Stronger Tomorrow",
    gold: true,
  },
];
export default function FeatureStrip() {
  return (
    <section className="features" aria-label="Key features">
      <div className="container">
        <div className="features-grid">
          {ITEMS.map(({ Icon, title, desc, gold }) => (
            <div className="feature" key={title}>
              <span className={"feature-icon" + (gold ? " gold" : "")}>
                <Icon size={20} />
              </span>
              <div>
                <p className="feature-title">{title}</p>
                <p className="feature-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}