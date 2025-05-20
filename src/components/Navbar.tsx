import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/Samptel Transport Logo.png" 
              alt="Samptel Transport Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8 text-[17px] font-semibold">
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#support">Support</NavLink>
              <NavLink href="#transport">Transport</NavLink>
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink href="#services">Services</MobileNavLink>
          <MobileNavLink href="#support">Support</MobileNavLink>
          <MobileNavLink href="#transport">Transport</MobileNavLink>
          <div className="mt-4 px-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-[16px] font-semibold transition-colors duration-200"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 block px-3 py-2 font-medium text-base"
  >
    {children}
  </a>
);

export default Navbar;
