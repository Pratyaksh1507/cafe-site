"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "./lib/cn";
import { isCurrentlyOpen } from "@/data/hours";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import Logo from "./Logo";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const openNow = isCurrentlyOpen();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-transparent transition-colors duration-200",
          scrolled && "border-surface-muted",
        )}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
              aria-label="Artisan Cafe Home"
            >
              <Logo className="h-9 w-[120px] text-text hover:text-accent transition-colors duration-200" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-150 relative py-1",
                    pathname === item.href
                      ? "text-text after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full"
                      : "text-text-muted hover:text-text",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                  openNow
                    ? "bg-success-bg text-success"
                    : "bg-destructive-bg text-destructive",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    openNow ? "bg-success" : "bg-destructive",
                  )}
                />
                {openNow ? "Open Now" : "Closed"}
              </span>
              <CartButton onClick={() => setCartOpen(true)} />
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  openNow
                    ? "bg-success-bg text-success"
                    : "bg-destructive-bg text-destructive",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    openNow ? "bg-success" : "bg-destructive",
                  )}
                />
                {openNow ? "Open" : "Closed"}
              </span>
              <CartButton onClick={() => setCartOpen(true)} />
              <button
                type="button"
                className="-mr-2 rounded-md p-2 text-text-muted hover:text-text"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden bg-surface border-t border-surface-muted"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="px-4 pb-6 pt-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-4 py-3 text-base font-medium transition-colors duration-150",
                    pathname === item.href
                      ? "bg-bg-alt text-text"
                      : "text-text-muted hover:bg-bg-alt hover:text-text",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
