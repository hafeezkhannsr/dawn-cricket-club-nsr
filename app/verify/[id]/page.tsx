import { notFound } from "next/navigation";
import { getById } from "@/lib/server/registration-store";
import Link from "next/link";
import Logo from "@/components/Logo";
export const dynamic = "force-dynamic";
export const metadata = { title: "Player Verification" };
export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reg = getById(id);
  if (!reg) notFound();
  const d = reg.data as Record<string, unknown>;
  const publicPhoto = d.publicPhotoConsent === true;
  const name = publicPhoto ? String(d.fullNameEn || "—") : "Name withheld";
  const initials = publicPhoto
    ? (String(d.fullNameEn || "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase())
    : "◆";
  const verifyUrl = `/verify/${reg.id}`;
  const statusOk = reg.status === "APPROVED";
  const statusColor = statusOk ? "#14a44d" : reg.status === "REJECTED" ? "#b01e1e" : "#f0b429";
  return (
    <main style={{
      minHeight: "100vh",
      background: "#030a18", color: "#eef4fb",
      padding: "2rem 1rem 4rem",
    }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: ".6rem",
          color: "#fff", marginBottom: "1.5rem", fontSize: ".85rem",
        }}>
          <Logo size={34} />
          <div>
            <div style={{ fontWeight: 800, fontSize: ".88rem" }}>DAWN CRICKET CLUB</div>
            <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)" }}>Player Verification</div>
          </div>
        </Link>
        <div style={{
          background: "linear-gradient(160deg, #061428 0%, #0a1f3d 100%)",
          border: "1px solid rgba(240,180,41,.35)",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 30px 70px -20px rgba(0,0,0,.7)",
        }}>
          {/* Header band */}
          <div style={{
            background: "linear-gradient(90deg, rgba(240,180,41,.15), rgba(20,164,77,.08))",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            padding: "1rem 1.25rem",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".75rem",
          }}>
            <div style={{ fontSize: ".72rem", letterSpacing: ".1em", color: "#f0b429", fontWeight: 700 }}>
              DAWN PLAYER VERIFICATION
            </div>
            <span style={{
              padding: ".28rem .65rem", borderRadius: 999,
              background: statusColor + "22", color: statusColor,
              fontSize: ".72rem", fontWeight: 800, letterSpacing: ".04em",
              border: `1px solid ${statusColor}66`,
            }}>
              {statusOk ? "✓ VERIFIED" : reg.status.replace(/_/g, " ")}
            </span>
          </div>
          {/* Card body */}
          <div style={{ padding: "1.5rem 1.25rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 999,
                background: "linear-gradient(135deg, #f0b429, #cb6e17)",
                color: "#061428", fontWeight: 900, fontSize: "1.4rem",
                display: "grid", placeItems: "center",
                border: "2px solid rgba(255,255,255,.15)",
                flexShrink: 0,
              }}>
                {initials}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", wordBreak: "break-word" }}>{name}</div>
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.55)" }}>{reg.program} Player</div>
              </div>
            </div>
            <Row k="Registration ID" v={reg.registrationNumber} mono />
            <Row k="Category" v={String(d.ageCategory || "—")} />
            <Row k="Playing Role" v={String(d.playingRole || "—")} />
            <Row k="Registration Date" v={new Date(reg.createdAt).toLocaleDateString()} />
            <Row k="Club" v="DAWN Cricket Club (DKK)" />
            <Row k="Location" v="Nowshera, Khyber Pakhtunkhwa" />
            <div style={{
              marginTop: "1.25rem",
              padding: "1rem",
              background: "#fff",
              borderRadius: ".7rem",
              display: "grid", placeItems: "center",
            }}>
              <img
                src={`/api/v1/qr?data=${encodeURIComponent(verifyUrl)}&size=180`}
                alt="Verification QR"
                width={180}
                height={180}
              />
              <div style={{ fontSize: ".7rem", color: "#061428", marginTop: ".5rem", fontWeight: 600, textAlign: "center" }}>
                Scan to re-verify this record
              </div>
            </div>
            <p style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", marginTop: "1.25rem", textAlign: "center", lineHeight: 1.6 }}>
              This page displays only non-sensitive information. Personal data (CNIC, address, contact)
              is protected and never shared publicly.
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/" className="btn btn-outline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", gap: "1rem",
      padding: ".55rem 0",
      borderBottom: "1px solid rgba(255,255,255,.06)",
      fontSize: ".85rem",
    }}>
      <span style={{ color: "rgba(238,244,251,.55)" }}>{k}</span>
      <span style={{
        color: "#eef4fb", fontWeight: 600, textAlign: "right",
        fontFamily: mono ? "monospace" : "inherit", wordBreak: "break-word",
      }}>{v}</span>
    </div>
  );
}