import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi parallax background
      gsap.to(bgRef.current, {
        yPercent: 30, // Bergerak ke bawah 30% dari tingginya saat scroll
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top', // Mulai saat bagian atas heroRef mencapai bagian atas viewport
          end: 'bottom top', // Selesai saat bagian bawah heroRef mencapai bagian atas viewport
          scrub: true, // Mengikuti scroll
        },
      });

      // Animasi teks judul
      gsap.from(titleRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power3.out',
      });
      
      // Animasi teks subjudul (efek ketik sederhana dengan TextPlugin)
      // Perhatikan: SplitText adalah plugin premium untuk efek per karakter yang lebih canggih.
      // Ini adalah contoh sederhana dengan TextPlugin, mungkin memerlukan penyesuaian
      gsap.to(subtitleRef.current, {
        duration: 2,
        text: "Jelajahi Kekuatan GSAP dan Tailwind CSS",
        delay: 1,
        ease: 'none',
      });

    }, heroRef); // scope context ke heroRef

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image (contoh, ganti dengan gambar Anda) */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay gelap */}
      </div>

      <div className="relative z-10 p-6">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
          Selamat Datang di Demo Parallax
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300">
          {/* Teks awal sebelum animasi TextPlugin */}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;