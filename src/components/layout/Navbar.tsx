
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/Logo";
import { ModeToggle } from "../mode-toggler";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "All Books", path: "/" },
    { name: "Add Book", path: "/addBooks" },
    { name: "Borrow Summary", path: "/borrowSummary" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
       
        <div className="flex items-center gap-3">
          <Logo />
        </div>

    
        <div className="hidden md:flex gap-6 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
                pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

       
        <div className="flex items-center gap-3">
          <ModeToggle />
          <button
            className="md:hidden p-2 rounded hover:bg-muted"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute right-4 top-16 mt-2 w-48 rounded-md bg-popover shadow-lg border border-border z-40">
          <ul className="flex flex-col divide-y divide-border">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors ${
                    pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

