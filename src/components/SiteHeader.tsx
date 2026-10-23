"use client";
import { useState } from "react";
import Link from "next/link";

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-header ${overlay ? "site-header-overlay" : "site-header-page"}`}>
    <Link className="wordmark" href="/" aria-label="ONVI home">ONVI<span>.</span></Link>
    <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
      <Link href="/collection" onClick={() => setOpen(false)}>Collection</Link>
      <Link href="/story" onClick={() => setOpen(false)}>Our story</Link>
      <Link href="/journal" onClick={() => setOpen(false)}>Journal</Link>
      <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
    </nav>
    <div className="header-actions"><Link className="bag-button" href="/contact">Enquire</Link><button className={`menu-toggle ${open ? "active" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span></span><span></span></button></div>
  </header>;
}
