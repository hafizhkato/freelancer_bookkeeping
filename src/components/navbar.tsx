import React, { useState, useEffect } from "react";

interface NavbarProps {
  backgroundColor?: string; // Accepts a Tailwind class like "bg-white", "bg-pink-500", etc.
}

const Navbar: React.FC<NavbarProps> = ({ backgroundColor = "bg-gray-50" }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full ${backgroundColor} px-6 py-4 shadow-md z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between">
        {/* Logo - hidden on mobile */}
        <div className="hidden md:block">
            <img 
                src="/../../logo.png" // Replace with your actual logo path
                alt="ROMYK Logo" 
                className="w-32 h-auto" // Fixed width, auto height to preserve aspect ratio
            />
        </div>

        {/* Centered Nav */}
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-6 text-lg font-semibold text-black">
            <a href="#home" className="hover:text-pink-500">Home</a>
            <a href="#about" className="hover:text-pink-500">About</a>
            <a href="#products" className="hover:text-pink-500">Products</a>
            <a href="#contact" className="hover:text-pink-500">Contact</a>
          </div>
        </div>

        {/* Right padding to balance layout */}
        <div className="hidden md:block w-[80px]"></div>
      </nav>
    </div>
  );
};

export default Navbar;
