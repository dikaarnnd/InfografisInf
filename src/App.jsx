import React, { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin'; // TextPlugin adalah bagian dari GSAP core
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Komponen-komponen section
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import InteractivePathSection from './components/InteractivePathSection';
import DraggableElementSection from './components/DraggableElementSection';
import PluginOverviewSection from './components/PluginOverviewSection';
import Footer from './components/Footer';

// Registrasi plugin GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, Draggable, MotionPathPlugin);

function App() {
  // useLayoutEffect untuk memastikan DOM siap sebelum GSAP berinteraksi dengannya
  useLayoutEffect(() => {
    // Inisialisasi global GSAP (jika ada) bisa dilakukan di sini
    // Contoh: GSDevTools.create(); (jika Anda punya dan mengimpornya)
    return () => {
      // Cleanup global GSAP saat komponen unmount (jika perlu)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Hapus semua ScrollTriggers
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <InteractivePathSection />
        <DraggableElementSection />
        <PluginOverviewSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;