
import { useState } from "react";

import Logo from "@/assets/Logo";
import { ModeToggle } from "../mode-toggler";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "All Books", path: "/" },
    { name: "Add Book", path: "/addBooks" },
    { name: "Borrow Summary", path: "/borrowSummary" },
  ];

  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-5 relative">
     
      <div className="flex items-center">
        
        <Logo />
        
      </div>


      <div className="hidden md:flex gap-6 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      
      <div className="flex items-center gap-3">
        <ModeToggle />

        
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      
      {menuOpen && (
        <div className="absolute top-16 right-5 z-50 w-48 bg-background border rounded-md shadow-md md:hidden">
          <ul className="flex flex-col py-2 px-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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

