import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const CricketBallIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" strokeDasharray="2 2" />
    </svg>
);
const ListIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="3.5" cy="6" r="1" />
        <circle cx="3.5" cy="12" r="1" />
        <circle cx="3.5" cy="18" r="1" />
    </svg>
);
const StadiumIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2">
        <path d="M2 12s2-4 10-4 10 4 10 4-2 4-10 4-10-4-10-4z" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);
const TrophyIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2">
        <path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4" />
        <path d="M6 5h12v6a6 6 0 01-12 0V5z" />
        <path d="M12 15v4M8 21h8" />
    </svg>
);
export default async function DashboardPage() {
    const cookieStore = await cookies();
    const email = cookieStore.get("user_email")?.value;
    const name = cookieStore.get("user_name")?.value;
    const role = cookieStore.get("user_role")?.value || "user";
    const picture = cookieStore.get("user_picture")?.value;
    if (!email) {
        redirect("/login");
    }
    const cards = [
        { href: "/create-match", title: "Create Match", desc: "Naya match banayein", Icon: CricketBallIcon },
        { href: "/my-matches", title: "My Matches", desc: "Apne matches dekhein", Icon: ListIcon },
        { href: "/clubs", title: "Clubs", desc: "Clubs dekhein", Icon: StadiumIcon },
        { href: "/tournaments", title: "Tournaments", desc: "Tournaments dekhein", Icon: TrophyIcon },
    ];
    return (
        <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    {picture && (
                        <img
                            src={picture}
                            alt={name || "User"}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                border: "2px solid #f0b429",
                            }}
                        />
                    )}
                    <div>
                        <h1 style={{ fontSize: "2rem", margin: 0 }}>
                            Welcome, {name || email}!
                        </h1>
                        <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0" }}>
                            Role: <strong style={{ color: "#f0b429" }}>{role}</strong>
                        </p>
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                    {cards.map((card) => (
                        <a
                            key={card.href}
                            href={card.href}
                            style={{
                                padding: "1.5rem",
                                background: "rgba(255,255,255,.05)",
                                border: "1px solid rgba(255,255,255,.1)",
                                borderRadius: ".75rem",
                                textDecoration: "none",
                                color: "inherit",
                                display: "block",
                            }}
                        >
                            <div style={{ marginBottom: "0.75rem" }}>
                                <card.Icon />
                            </div>
                            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{card.title}</h3>
                            <p style={{ color: "#94a3b8", marginTop: ".5rem", marginBottom: 0 }}>
                                {card.desc}
                            </p>
                        </a>
                    ))}
                </div>
                <div style={{ marginTop: "2rem" }}>
                    <form action="/api/v1/users/logout" method="POST">
                        <button
                            type="submit"
                            style={{
                                padding: "0.75rem 1.5rem",
                                background: "#dc2626",
                                color: "#fff",
                                border: "none",
                                borderRadius: ".5rem",
                                cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
