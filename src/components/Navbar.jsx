import React from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const scrollToSection = (target) => {
    gsap.to(window, { duration: 1, scrollTo: target, ease: 'power2.inOut' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(0); }} className="text-xl font-bold text-white">
          Parallax GSAP
        </a>
        <div className="space-x-4">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="text-gray-300 hover:text-white">Hero</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('#features'); }} className="text-gray-300 hover:text-white">Features</a>
          <a href="#interactive-path" onClick={(e) => { e.preventDefault(); scrollToSection('#interactive-path'); }} className="text-gray-300 hover:text-white">Path</a>
          <a href="#draggable" onClick={(e) => { e.preventDefault(); scrollToSection('#draggable'); }} className="text-gray-300 hover:text-white">Draggable</a>
          <a href="#plugins" onClick={(e) => { e.preventDefault(); scrollToSection('#plugins'); }} className="text-gray-300 hover:text-white">Plugins</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;