import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/images/B23 ARENA - (179 of 2841).jpg';
import img2 from '../assets/images/B23 ARENA - (550 of 2841).jpg';
import img3 from '../assets/images/B23 ARENA - (1026 of 2841).jpg';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const sectionRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.card-item');
      const totalWidth = window.innerWidth * cards.length;

      // Pin the section & scroll horizontally
      gsap.to('.card-track', {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: 1 / (cards.length - 1),
          // markers: true,
        },
      });

      // Title animation
      gsap.from(titleLine1Ref.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(titleLine2Ref.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-screen h-screen bg-black text-white overflow-hidden">
      <div className="h-screen flex flex-col items-center justify-center z-10 relative">
        <h1 className="text-5xl md:text-7xl font-black uppercase text-center leading-tight">
          <div ref={titleLine1Ref}>
            {'WECREATETHEPERFECT'.split('').map((char, idx) => (
              <span key={idx} className="inline-block">{char}</span>
            ))}
          </div>
          <div ref={titleLine2Ref} className="text-yellow-400">
            {'REALESTATEMARKET'.split('').map((char, idx) => (
              <span key={idx} className="inline-block">{char}</span>
            ))}
          </div>
        </h1>
        <p ref={subtitleRef} className="text-lg text-gray-300 mt-4 text-center">
          A LEADING CONSULTING FIRM FOR SALES
        </p>
      </div>

      <div className="card-track flex absolute top-0 left-0 h-screen w-screen">
        {[img1, img2, img3].map((src, i) => (
          <div key={i} className="card-item w-screen h-screen flex-shrink-0">
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
