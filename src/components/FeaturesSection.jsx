import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '/B23 ARENA - (179 of 2841).jpg';
import img2 from '../assets/images/B23 ARENA - (550 of 2841).jpg';
import img3 from '../assets/images/B23 ARENA - (1026 of 2841).jpg';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const mainRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const horizontalRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animasi teks muncul dari bawah
      tl.from(titleLine1Ref.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
      })
        .from(titleLine2Ref.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
        }, "-=0.3")
        .from(subtitleRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5,
        }, "-=0.3");

      // Horizontal scroll untuk gambar
      const cards = gsap.utils.toArray('.card-item');
      const totalWidth = cards.length * window.innerWidth;

      gsap.to(cards, {
        x: () => `-${totalWidth - window.innerWidth}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4">
        <header className="absolute top-0 left-0 right-0 p-4 md:p-8 flex items-center justify-between z-10">
          <div className="text-xl font-bold">VESPLUS</div>
          {/* <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Portfolios</a>
            <a href="#" className="hover:text-gray-300">Careers</a>
            <a href="#" className="hover:text-gray-300">PR Center</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </nav> */}
        </header>

        <main className="pt-8">
          {/* Bagian Teks */}
          <section className="text-center md:text-left mb-20 md:mb-32">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 overflow-hidden">
              <div ref={titleLine1Ref}>
                {"WE CREATE THE PERFECT".split(" ").map((word, index) => (
                  <span key={index} className="inline-block mr-2 md:mr-4">{word}</span>
                ))}
              </div>
              <div ref={titleLine2Ref} className="text-yellow-500">
                {"REAL ESTATE MARKET".split(" ").map((word, index) => (
                  <span key={index} className="inline-block mr-2 md:mr-4">{word}</span>
                ))}
              </div>
            </h1>
            <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300">
              A LEADING CONSULTING FIRM FOR SALES
            </p>
          </section>

          {/* Section Scroll Horizontal */}
          <section ref={horizontalRef} className="scroll-section w-full h-full overflow-hidden">
            <div className="flex h-100 w-100 gap-3">
              <div className="card-item w-screen h-full flex-shrink-0">
                <img src={img1} alt="Singa" className="w-full h-full object-cover" />
              </div>
              <div className="card-item w-screen h-full flex-shrink-0">
                <img src={img2} alt="Elang" className="w-full h-full object-cover" />
              </div>
              <div className="card-item w-screen h-full flex-shrink-0">
                <img src={img3} alt="Serigala" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FeatureSection;
