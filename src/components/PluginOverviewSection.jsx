import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/images/APAAqA.jpg';
import img2 from '../assets/images/APAAqA.jpg';
import img3 from '../assets/images/APAAqA.jpg';
import img4 from '../assets/images/APAAqA.jpg';
import img5 from '../assets/images/APAAqA.jpg';
import img6 from '../assets/images/APAAqA.jpg';
import img7 from '../assets/images/APAAqA.jpg';
import img8 from '../assets/images/APAAqA.jpg';
import img9 from '../assets/images/APAAqA.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => { // Mengganti nama komponen agar lebih sesuai
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    // GSAP Context untuk cleanup yang aman di React
    let ctx = gsap.context(() => {
      const imageWrappers = gsap.utils.toArray('.image-wrapper');

      if (imageWrappers.length === 0) return;

      // --- ANIMASI 1: GAMBAR MASUK SAAT HALAMAN DIMUAT ---
      // Animasi ini berjalan otomatis tanpa ScrollTrigger
      gsap.fromTo(
        imageWrappers,
        { // Kondisi AWAL: Gambar "terbang" di posisi acak
          opacity: 0,
          x: (i) => gsap.utils.random(-200, 200) + '%',
          y: (i) => gsap.utils.random(-200, 200) + '%',
          rotation: (i) => gsap.utils.random(-45, 45),
          scale: 0.1,
        },
        { // Kondisi AKHIR: Gambar berada di posisi normal
          opacity: 1,
          x: '0%',
          y: '0%',
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: {
            each: 0.1,
            from: 'random',
          },
          delay: 0.5, // Beri jeda sedikit setelah halaman dimuat
        }
      );
    }, sectionRef); // Lingkup context ke elemen section

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="h-screen w-screen bg-gray-900 overflow-hidden">
      <div 
        className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1 [perspective:800px]"
      >
        {images.map((image, index) => (
          <div key={index} className="image-wrapper w-full h-full overflow-hidden">
            <img
              src={image}
              alt={`Dokumentasi ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;