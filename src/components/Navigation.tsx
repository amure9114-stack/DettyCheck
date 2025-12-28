import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, User, Building2, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Feed", icon: Home },
  { path: "/artists", label: "Artists", icon: User },
  { path: "/promoters", label: "Promoters", icon: Building2 },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-mono text-lg font-semibold tracking-tight">
            DETTY<span className="text-status-failure">RECEIPTS</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Culture Watchdog
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors sm:hidden"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-card border-b border-border sm:hidden animate-slide-up">
          <div className="container py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-2 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
