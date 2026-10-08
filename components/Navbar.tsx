"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { AdminIcon, UserIcon, MenuIcon, CloseIcon } from "./Icons";
import NotificationBell from "./NotificationBell";
import LangToggle from "./i18n/LangToggle";
import { useLang } from "./i18n/LangProvider";
const NAV_ITEMS = [
  { href: "/", key: "nav.home", active: true },
  { href: "/players", key: "nav.players" },
  { href: "/register", key: "nav.register" },
  { href: "/verify", key: "nav.verify" },
  { href: "/news", key: "nav.news" },
  { href: "/notices", key: "nav.notices" },
  { href: "/statistics", key: "nav.stats" },
  { href: "/rules", key: "nav.rules" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand" aria-label="DAWN Cricket Club - Home">
          <Logo size={40} />
          <span className="brand-text">
            <span className="brand-title">DAWN CRICKET CLUB</span>
            <span className="brand-sub">DKK | Nowshera, KPK, Pakistan</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((it) => (
            <Link key={it.key} href={it.href} className={it.active ? "active" : ""}>
              {t(it.key)}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <NotificationBell />
          <LangToggle />
          <Link href="/admin" className="btn btn-outline" aria-label={t("nav.admin")}>
            <AdminIcon size={15} />
            <span className="hide-xs">{t("nav.admin")}</span>
          </Link>
          <Link href="/login" className="btn btn-primary" aria-label={t("nav.login")}>
            <UserIcon size={15} />
            <span className="hide-xs">{t("nav.login")}</span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {NAV_ITEMS.map((it) => (
            <Link key={it.key} href={it.href} onClick={() => setOpen(false)}>
              {t(it.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}