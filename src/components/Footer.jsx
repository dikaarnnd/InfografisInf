import React from 'react';
import { gsap } from 'gsap';

const Footer = () => {
  const scrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: 'power3.inOut' });
  };

  return (
    <footer className="py-12 bg-gray-800 text-center text-gray-400">
      <div className="container mx-auto px-6">
        <button
          onClick={scrollToTop}
          className="mb-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
        >
          Kembali ke Atas &uarr;
        </button>
        <p>&copy; {new Date().getFullYear()} Demo Parallax GSAP. Dibuat dengan React & Tailwind CSS.</p>
        <p className="mt-2">
          Pelajari lebih lanjut tentang <a href="https://greensock.com/gsap/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">GSAP</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;