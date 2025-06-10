import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap'; // Draggable sudah diregistrasi di App.jsx
import { Draggable } from 'gsap/Draggable';

const DraggableElementSection = () => {
  const draggableRef = useRef(null);
  const containerRef = useRef(null);
  let draggableInstance = useRef(null); // Untuk menyimpan instance Draggable

  useLayoutEffect(() => {
    // Pastikan Draggable sudah dimuat dan elemen ada
    if (Draggable && draggableRef.current && containerRef.current) {
      // Simpan instance untuk bisa di-kill saat cleanup
      draggableInstance.current = Draggable.create(draggableRef.current, {
        type: 'x,y', // Bisa ditarik pada sumbu x dan y
        bounds: containerRef.current, // Batasan area tarik
        inertia: true, // Efek inersia (memerlukan InertiaPlugin untuk fungsionalitas penuh, tapi Draggable punya dasar)
        edgeResistance: 0.65,
        onDragStart: () => {
          gsap.to(draggableRef.current, { scale: 1.1, duration: 0.2 });
        },
        onDragEnd: () => {
          gsap.to(draggableRef.current, { scale: 1, duration: 0.2 });
        },
        // Untuk efek 'snap' atau 'throw' yang lebih canggih, Anda akan menggunakan InertiaPlugin (premium)
      })[0]; // Draggable.create mengembalikan array
    }

    return () => {
      // Cleanup: Hancurkan instance Draggable untuk menghindari memory leak
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
    };
  }, []);

  return (
    <section id="draggable" className="py-20 bg-gray-800 flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Elemen Interaktif Draggable</h2>
      <div ref={containerRef} className="w-full max-w-md h-80 bg-gray-700 rounded-lg relative p-4 overflow-hidden shadow-2xl">
        <div
          ref={draggableRef}
          className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-grab select-none shadow-lg"
        >
          Tarik Saya!
        </div>
        <p className="absolute bottom-4 left-4 text-sm text-gray-400">Area ini adalah batas tarikan.</p>
      </div>
    </section>
  );
};

export default DraggableElementSection;