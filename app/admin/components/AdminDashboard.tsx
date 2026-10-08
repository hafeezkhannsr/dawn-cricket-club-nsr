"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select from "@/components/ui/Select";
import DetailModal from "./DetailModal";
import ExportPanel from "@/components/admin/ExportPanel";
import type { StoredRegistration } from "@/lib/server/registration-store";
type Stats = {
  total: number; submitted: number; underReview: number; needsCorrection: number;
  approved: number; rejected: number; paymentVerified: number; paymentPending: number;
};
const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  NEEDS_CORRECTION: "Needs Correction",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};
const STATUS_COLOR: Record<string, { bg: string; fg: string }> = {
  DRAFT: { bg: "rgba(148,163,184,.18)", fg: "#cbd5e1" },
  SUBMITTED: { bg: "rgba(59,130,246,.18)", fg: "#93c5fd" },
  UNDER_REVIEW: { bg: "rgba(240,180,41,.18)", fg: "#f0b429" },
  NEEDS_CORRECTION: { bg: "rgba(251,146,60,.18)", fg: "#fdba74" },
  APPROVED: { bg: "rgba(20,164,77,.18)", fg: "#86efac" },
  REJECTED: { bg: "rgba(239,68,68,.18)", fg: "#fca5a5" },
};
export default function AdminDashboard() {
  const [items, setItems] = useState<StoredRegistration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/registrations", { cache: "no-store" });
      const json = await res.json();
      if (json.ok) { setItems(json.items); setStats(json.stats); }
    } catch {}
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return items.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (programFilter && r.program !== programFilter) return false;
      if (!ql) return true;
      const d = r.data as Record<string, unknown>;
      const hay = [
        r.registrationNumber, r.program, r.registrationType, r.status,
        String(d.fullNameEn ?? ""), String(d.fullNameUr ?? ""),
        String(d.primaryMobile ?? ""), String(d.fatherName ?? ""),
      ].join(" ").toLowerCase();
      return hay.includes(ql);
    });
  }, [items, q, statusFilter, programFilter]);
  function exportCsv() {
    const header = [
      "RegistrationNumber","Program","Type","Edition","Status","PaymentStatus",
      "Fee","Name(EN)","Name(UR)","Father","Mobile","DOB","Gender","City",
      "Province","District","Role","BattingStyle","BowlingStyle","CreatedAt",
    ];
    const rows = filtered.map((r) => {
      const d = r.data as Record<string, unknown>;
      return [
        r.registrationNumber, r.program, r.registrationType, r.edition ?? "",
        r.status, r.paymentStatus, r.feeAmount,
        d.fullNameEn ?? "", d.fullNameUr ?? "", d.fatherName ?? "",
        d.primaryMobile ?? "", d.dateOfBirth ?? "", d.gender ?? "",
        d.residenceCity ?? "", d.province ?? "", d.district ?? "",
        d.playingRole ?? "", d.battingStyle ?? "", d.bowlingStyle ?? "",
        r.createdAt,
      ];
    });
    const csv = [header, ...rows]
      .map((row) => row.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dawn-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const statusOptions = [
    { value: "", label: "All statuses" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "UNDER_REVIEW", label: "Under Review" },
    { value: "NEEDS_CORRECTION", label: "Needs Correction" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];
  const programOptions = [
    { value: "", label: "All programs" },
    { value: "DAWN", label: "DAWN" },
    { value: "DSL", label: "DSL" },
  ];
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>Admin Dashboard</h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Review, approve, and manage all registrations
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <button className="btn btn-outline" onClick={load}>↻ Refresh</button>
            <button className="btn btn-gold" onClick={exportCsv}>↓ Export CSV</button>
          </div>
        </div>
        <ExportPanel />
        {/* Quick admin links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: ".5rem",
          marginBottom: "1.5rem",
        }}>
          <a href="/admin/matches" className="btn btn-outline" style={{ justifyContent: "center" }}>🏏 Match Management</a>
          <a href="/admin/users" className="btn btn-outline" style={{ justifyContent: "center" }}>👥 Users & Roles</a>
          <a href="/admin/import" className="btn btn-outline" style={{ justifyContent: "center" }}>📊 Bulk Import</a>
          <a href="/admin/emails" className="btn btn-outline" style={{ justifyContent: "center" }}>✉️ Email Logs</a>
          <a href="/statistics" className="btn btn-outline" style={{ justifyContent: "center" }}>📈 Statistics</a>
          <a href="/scorer" className="btn btn-outline" style={{ justifyContent: "center" }}>🎯 Scorer Console</a>
        </div>
        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: ".75rem",
          marginBottom: "1.5rem",
        }}>
          <StatCard label="Total" value={stats?.total ?? 0} color="#eef4fb" />
          <StatCard label="Submitted" value={stats?.submitted ?? 0} color="#93c5fd" />
          <StatCard label="Under Review" value={stats?.underReview ?? 0} color="#f0b429" />
          <StatCard label="Needs Correction" value={stats?.needsCorrection ?? 0} color="#fdba74" />
          <StatCard label="Approved" value={stats?.approved ?? 0} color="#86efac" />
          <StatCard label="Rejected" value={stats?.rejected ?? 0} color="#fca5a5" />
          <StatCard label="Payment Verified" value={stats?.paymentVerified ?? 0} color="#86efac" />
          <StatCard label="Payment Pending" value={stats?.paymentPending ?? 0} color="#fdba74" />
        </div>
        {/* Filters */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: ".65rem",
          marginBottom: "1rem",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: ".65rem" }} className="filter-row">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by reg #, name, mobile, father name..."
              style={{
                padding: ".7rem .85rem", background: "#0a1f3d",
                border: "1px solid rgba(255,255,255,.18)", borderRadius: ".6rem",
                color: "#eef4fb", fontSize: ".92rem", outline: "none", width: "100%",
              }}
            />
            <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
            <Select value={programFilter} onChange={setProgramFilter} options={programOptions} />
          </div>
        </div>
        {/* Table */}
        <div style={{
          background: "rgba(255,255,255,.02)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>
              {items.length === 0
                ? "No registrations yet. Submit one via /register to see it here."
                : "No items match your filters."}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 760 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.03)" }}>
                    {["Reg #", "Name", "Program", "Type", "Status", "Payment", "Fee", "Date", ""].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: ".75rem .85rem", fontWeight: 600,
                        color: "rgba(238,244,251,.7)", fontSize: ".72rem",
                        letterSpacing: ".03em", textTransform: "uppercase",
                        borderBottom: "1px solid rgba(255,255,255,.08)",
                        whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => {
                    const d = r.data as Record<string, unknown>;
                    const sc = STATUS_COLOR[r.status] || STATUS_COLOR.DRAFT;
                    return (
                      <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                        <td style={{ padding: ".7rem .85rem", fontFamily: "monospace", color: "#f0b429", whiteSpace: "nowrap" }}>
                          {r.registrationNumber}
                        </td>
                        <td style={{ padding: ".7rem .85rem", color: "#fff" }}>
                          <div style={{ fontWeight: 600 }}>{String(d.fullNameEn || "—")}</div>
                          <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>{String(d.primaryMobile || "")}</div>
                        </td>
                        <td style={{ padding: ".7rem .85rem" }}>
                          <span style={{
                            padding: ".2rem .5rem", borderRadius: ".4rem", fontSize: ".72rem", fontWeight: 700,
                            background: r.program === "DAWN" ? "rgba(20,164,77,.16)" : "rgba(240,180,41,.16)",
                            color: r.program === "DAWN" ? "#86efac" : "#f0b429",
                          }}>{r.program}</span>
                        </td>
                        <td style={{ padding: ".7rem .85rem", color: "rgba(238,244,251,.75)", fontSize: ".8rem" }}>{r.registrationType}</td>
                        <td style={{ padding: ".7rem .85rem" }}>
                          <span style={{
                            padding: ".2rem .55rem", borderRadius: 999, fontSize: ".72rem", fontWeight: 700,
                            background: sc.bg, color: sc.fg, whiteSpace: "nowrap",
                          }}>{STATUS_LABEL[r.status] || r.status}</span>
                        </td>
                        <td style={{ padding: ".7rem .85rem", fontSize: ".75rem", color: "rgba(238,244,251,.7)" }}>{r.paymentStatus.replace(/_/g, " ")}</td>
                        <td style={{ padding: ".7rem .85rem", color: "#f0b429", fontWeight: 600, whiteSpace: "nowrap" }}>PKR {r.feeAmount.toLocaleString()}</td>
                        <td style={{ padding: ".7rem .85rem", color: "rgba(238,244,251,.6)", fontSize: ".75rem", whiteSpace: "nowrap" }}>
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: ".7rem .85rem" }}>
                          <button className="btn btn-gold" style={{ padding: ".4rem .7rem", fontSize: ".78rem" }} onClick={() => setOpenId(r.id)}>
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {openId && (
        <DetailModal
          id={openId}
          onClose={() => setOpenId(null)}
          onChanged={() => { load(); }}
        />
      )}
      <style>{`
        @media (min-width: 768px) {
          .filter-row { grid-template-columns: 2fr 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      padding: "1rem",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".7rem",
    }}>
      <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</div>
      <div style={{ fontSize: "1.6rem", fontWeight: 800, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}