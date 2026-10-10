import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
        { href: "/create-match", title: "Create Match", desc: "Naya match banayein", icon: "??" },
        { href: "/my-matches", title: "My Matches", desc: "Apne matches dekhein", icon: "??" },
        { href: "/clubs", title: "Clubs", desc: "Clubs dekhein", icon: "???" },
        { href: "/tournaments", title: "Tournaments", desc: "Tournaments dekhein", icon: "??" },
    ];
    return (
        <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                {/* Header */}
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
                {/* Cards */}
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
                                transition: "all 0.2s",
                                display: "block",
                            }}
                        >
                            <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{card.icon}</div>
                            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{card.title}</h3>
                            <p style={{ color: "#94a3b8", marginTop: ".5rem", marginBottom: 0 }}>
                                {card.desc}
                            </p>
                        </a>
                    ))}
                </div>
                {/* Logout */}
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
