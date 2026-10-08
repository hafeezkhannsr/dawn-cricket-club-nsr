"use client";
import { useEffect, useState } from "react";
export default function FollowButton({ id, baseCount = 0 }: { id: string; baseCount?: number }) {
  const [followed, setFollowed] = useState(false);
  const [count, setCount] = useState(baseCount);
  useEffect(() => {
    try {
      const key = "dawn.follow." + id;
      const saved = window.localStorage.getItem(key);
      if (saved === "1") {
        setFollowed(true);
        setCount(baseCount + 1);
      }
    } catch {}
  }, [id, baseCount]);
  function toggle() {
    const key = "dawn.follow." + id;
    try {
      if (followed) {
        window.localStorage.removeItem(key);
        setFollowed(false);
        setCount(baseCount);
      } else {
        window.localStorage.setItem(key, "1");
        setFollowed(true);
        setCount(baseCount + 1);
      }
    } catch {}
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".6rem", flexWrap: "wrap" }}>
      <span style={{
        padding: ".35rem .75rem",
        borderRadius: ".5rem",
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.1)",
        fontSize: ".75rem",
        color: "rgba(238,244,251,.8)",
      }}>
        👥 <b style={{ color: "#fff" }}>{count.toLocaleString()}</b> Followers
      </span>
      <button
        onClick={toggle}
        style={{
          padding: ".45rem 1rem",
          borderRadius: ".5rem",
          background: followed ? "rgba(20,164,77,.15)" : "#14a44d",
          border: followed ? "1px solid rgba(20,164,77,.5)" : "1px solid #14a44d",
          color: followed ? "#86efac" : "#fff",
          fontSize: ".82rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all .15s ease",
        }}
      >
        {followed ? "✓ Following" : "FOLLOW"}
      </button>
    </div>
  );
}