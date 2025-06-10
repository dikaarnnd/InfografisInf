import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/images/image.png';
import img2 from '../assets/images/image.png';
import img3 from '../assets/images/image.png';
import img4 from '../assets/images/image.png';
import img5 from '../assets/images/image.png';
import img6 from '../assets/images/image.png';
import img7 from '../assets/images/image.png';
import img8 from '../assets/images/image.png';
import img9 from '../assets/images/image.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    let ctx = gsap.context(() => {
      const imageWrappers = gsap.utils.toArray('.image-wrapper');
      // Target baru: lapisan gambar grayscale
      const grayscaleLayers = gsap.utils.toArray('.grayscale-layer');

      if (imageWrappers.length === 0) return;

      // --- ANIMASI 1: GAMBAR MASUK SAAT HALAMAN DIMUAT ---
      // Animasi ini tidak berubah, tetap menargetkan '.image-wrapper'
      gsap.from(imageWrappers, {
        opacity: 0,
        x: (i) => gsap.utils.random(-200, 200) + '%',
        y: (i) => gsap.utils.random(-200, 200) + '%',
        rotation: (i) => gsap.utils.random(-45, 45),
        scale: 0.1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: {
          each: 0.1,
          from: 'random',
        },
        delay: 0.5,
      });

      // --- ANIMASI 2: REVEAL WARNA SAAT SCROLL ---
      // Timeline baru untuk mengontrol animasi grayscale menjadi berwarna
      const colorRevealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Mulai saat bagian atas section mencapai puncak layar
          start: 'top top', 
          // Selesaikan animasi setelah scroll sejauh tinggi layar
          end: '+=100%', 
          scrub: 0.5, // scrub akan mengikat animasi ke scrollbar
          pin: true,
          pinSpacing: 'margin',
        },
      });

      // Tambahkan animasi ke timeline
      colorRevealTimeline.to(grayscaleLayers, {
        // Geser lapisan grayscale ke kiri untuk mengungkap warna
        xPercent: -100, 
        ease: 'none', // 'none' karena kecepatan dikontrol oleh scrub
        // Stagger untuk membuat animasi berurutan
        stagger: {
          each: 0.1, // Jarak waktu antar animasi gambar
          from: 'start', // Mulai dari gambar pertama
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="h-screen w-screen bg-gray-900 overflow-hidden">
      <div 
        className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1 [perspective:800px]"
      >
        {images.map((image, index) => (
          // PERUBAHAN PENTING DI SINI:
          // Wrapper sekarang relatif untuk menumpuk gambar
          <div key={index} className="image-wrapper relative w-full h-full overflow-hidden">
            {/* Lapisan 1: Gambar Berwarna (di bawah) */}
            <img
              src={image}
              alt={`Dokumentasi ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Lapisan 2: Gambar Grayscale (di atas) */}
            <img
              src={image}
              alt={`Dokumentasi ${index + 1} Grayscale`}
              // Kelas untuk menumpuk di atas & target GSAP
              className="grayscale-layer absolute top-0 left-0 w-full h-full object-cover grayscale"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;