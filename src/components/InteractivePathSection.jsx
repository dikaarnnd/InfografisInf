import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/images/B23 ARENA - (179 of 2841).jpg'
import img2 from '../assets/images/B23 ARENA - (550 of 2841).jpg'
import img3 from '../assets/images/B23 ARENA - (1026 of 2841).jpg'

gsap.registerPlugin(ScrollTrigger);

const images = [img1, img2, img3,];

const captions = [
  'Selamat datang di dunia virtual!',
  'Rasakan atmosfer kompetisi yang intens!',
  'Saatnya jadi pemenang sejati!',
];

const InteractivePathSection = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const prevIndex = useRef(0);

  imageRefs.current = [];
  textRefs.current = [];

  const addImageRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const addTextRef = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRefs.current, { autoAlpha: 0, y: 50 });
      gsap.set(textRefs.current, { autoAlpha: 0, y: 50 });

      gsap.set(imageRefs.current[0], { autoAlpha: 1, y: 0 });
      gsap.set(textRefs.current[0], { autoAlpha: 1, y: 0 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=3000',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const progressIndex = Math.floor(self.progress * images.length);
          const clampedIndex = Math.min(progressIndex, images.length - 1);

          if (clampedIndex !== prevIndex.current) {
            const directionDown = clampedIndex > prevIndex.current;

            // Animate out old image & text
            gsap.to(imageRefs.current[prevIndex.current], {
              y: directionDown ? -50 : 50,
              autoAlpha: 0,
              duration: 0.8,
              ease: 'power1.out',
            });

            gsap.to(textRefs.current[prevIndex.current], {
              y: directionDown ? -30 : 30,
              autoAlpha: 0,
              duration: 0.8,
              ease: 'power1.out',
            });

            // Animate in new image & text
            gsap.fromTo(
              imageRefs.current[clampedIndex],
              { y: directionDown ? 50 : -50, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power1.out' }
            );

            gsap.fromTo(
              textRefs.current[clampedIndex],
              { y: directionDown ? 30 : -30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power1.out' }
            );

            prevIndex.current = clampedIndex;
          }
        },
      });

      return () => {
        trigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-black text-white"
    >
      {/* Images */}
      {images.map((src, index) => (
        <img
          key={index}
          ref={addImageRef}
          src={src}
          alt={`Slide ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Captions */}
      {captions.map((text, index) => (
        <div
          key={index}
          ref={addTextRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-center text-3xl font-bold px-4 max-w-xl"
        style={{ opacity: 0 }}
        >
          {text}
        </div>
      ))}
    </section>
  );
};

export default InteractivePathSection;
