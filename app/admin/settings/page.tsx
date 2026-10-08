import AdminShell from "@/components/admin/AdminShell";
export const metadata = { title: "Settings — Admin" };
export default function AdminSettingsPage() {
  const settings = [
    { label: "Club Name", value: "DAWN Cricket Club", hint: "Displayed in headers and emails" },
    { label: "Short Name", value: "DKK", hint: "Used in compact display" },
    { label: "Location", value: "Hakeemabad, Dheri Katti Khel, Nowshera, KPK, Pakistan", hint: "Primary location" },
    { label: "Contact Email", value: "info@dawncricketclub.pk", hint: "Public contact email" },
    { label: "Contact Phone", value: "+92 300 000 0000", hint: "WhatsApp/phone" },
    { label: "Registration Fee (DAWN Player)", value: "PKR 3,000", hint: "Per player" },
    { label: "Membership Fee", value: "PKR 5,000", hint: "Annual" },
    { label: "DSL Fee", value: "PKR 100", hint: "Per edition" },
    { label: "Academy Monthly Fee (U15)", value: "PKR 4,000", hint: "Reference rate" },
    { label: "Ground Hourly Rate", value: "PKR 3,000", hint: "Base rate for Abbas Ground" },
    { label: "Current Season", value: "2026-27", hint: "Active season" },
    { label: "DSL Open Edition", value: "Edition 7 (2027)", hint: "Registration open" },
  ];
  return (
    <AdminShell title="Site Settings" subtitle="Configuration and fees (read-only view — edit requires DB)">
      <div style={{ padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".7rem", marginBottom: "1.5rem", fontSize: ".82rem", color: "rgba(238,244,251,.85)", lineHeight: 1.6 }}>
        <b style={{ color: "#f0b429" }}>ℹ️ Note:</b> These settings are currently hard-coded in config files. To make them editable from the admin panel, we need to connect a database. The values shown here are the current live values.
      </div>
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}>
          <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 900 }}>Current Configuration</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          {settings.map((s, i) => (
            <div key={s.label} style={{ padding: "1rem 1.25rem", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.05)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: ".85rem", fontWeight: 700, color: "#fff" }}>{s.label}</div>
                <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", marginTop: ".15rem" }}>{s.hint}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: ".9rem", color: "#f0b429", fontWeight: 700, wordBreak: "break-word" }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(20,164,77,.06)", border: "1px solid rgba(20,164,77,.3)", borderRadius: ".7rem" }}>
        <h3 style={{ margin: "0 0 .5rem", fontSize: ".95rem", fontWeight: 800, color: "#86efac" }}>📌 Roadmap</h3>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: ".82rem", color: "rgba(238,244,251,.75)", lineHeight: 1.8 }}>
          <li>Connect Neon PostgreSQL database for persistent storage</li>
          <li>Enable inline editing of these settings</li>
          <li>Audit log for every setting change</li>
          <li>Fee versioning — old registrations keep their original fee</li>
          <li>Role-based permission for who can edit what</li>
        </ul>
      </div>
    </AdminShell>
  );
}