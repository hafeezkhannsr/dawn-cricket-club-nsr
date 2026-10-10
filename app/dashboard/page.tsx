import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function DashboardPage() {
    const cookieStore = await cookies();
    const email = cookieStore.get("user_email")?.value;
    const name = cookieStore.get("user_name")?.value;
    const role = cookieStore.get("user_role")?.value || "user";
    if (!email) {
        redirect("/login");
    }
    return (
        <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    Welcome, {name || email}!
                </h1>
                <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                    Role: {role}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                    <a href="/create-match" style={{ padding: "1.5rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: ".75rem", textDecoration: "none", color: "inherit" }}>
                        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Create Match</h3>
                        <p style={{ color: "#94a3b8", marginTop: ".5rem" }}>Naya match banayein</p>
                    </a>
                    <a href="/my-matches" style={{ padding: "1.5rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: ".75rem", textDecoration: "none", color: "inherit" }}>
                        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>My Matches</h3>
                        <p style={{ color: "#94a3b8", marginTop: ".5rem" }}>Apne matches dekhein</p>
                    </a>
                    <a href="/clubs" style={{ padding: "1.5rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: ".75rem", textDecoration: "none", color: "inherit" }}>
                        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Clubs</h3>
                        <p style={{ color: "#94a3b8", marginTop: ".5rem" }}>Clubs dekhein</p>
                    </a>
                    <a href="/tournaments" style={{ padding: "1.5rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: ".75rem", textDecoration: "none", color: "inherit" }}>
                        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Tournaments</h3>
                        <p style={{ color: "#94a3b8", marginTop: ".5rem" }}>Tournaments dekhein</p>
                    </a>
                </div>
                <div style={{ marginTop: "2rem" }}>
                    <form action="/api/v1/users/logout" method="POST">
                        <button type="submit" style={{ padding: "0.75rem 1.5rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: ".5rem", cursor: "pointer", fontWeight: 600 }}>
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
