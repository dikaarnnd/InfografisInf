// src/components/Timeline.jsx

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom'; // PERUBAIKAN 1: Import createPortal
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

import { timelineData } from '../components/timelineData';

gsap.registerPlugin(Draggable);

// ====================================================================
// PERUBAIKAN 2: Komponen Modal sekarang digabung di sini agar jadi satu file
// ====================================================================
const EventModal = ({ event, onClose }) => {
  // Fungsi ini tidak perlu diubah, sudah benar
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div 
      onClick={handleClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="m-5 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl max-w-lg w-full relative text-gray-800"
      >
        <button 
          onClick={handleClose} 
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-110"
        >
          &times;
        </button>
        <img 
          src={event.imageSrc} 
          alt={event.title} 
          className="w-full h-56 object-cover rounded-t-xl" 
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <p className="text-xl text-indigo-600 font-semibold mb-4">{event.year}</p>
          <p className="text-gray-700 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};


// ====================================================================
// Komponen Utama Timeline
// ====================================================================
const Timeline = () => {
  const containerRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  

  useGSAP(() => {
    const timelineRef = containerRef.current.querySelector('.timeline-draggable');
    
    // --- Langkah 1: Hitung semua posisi titik henti (snap points) ---
    const elements = gsap.utils.toArray('.timeline-event');
    const containerWidth = containerRef.current.offsetWidth;
    
    // Array ini akan menampung koordinat x dari setiap event agar bisa berada di tengah layar
    const snapPoints = elements.map(el => {
      const center = el.offsetLeft + el.offsetWidth / 2;
      // Rumus untuk menggeser timeline agar elemen 'el' berada di tengah layar
      return (containerWidth / 2) - center;
    });

    // Inisialisasi animasi intro (tidak diubah)
    const tl = gsap.timeline();
    tl.from(".intro-title", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
    tl.from(".timeline-line", { scaleX: 0, duration: 1, ease: "power2.inOut" }, "-=0.5");
    tl.from(".timeline-event", { opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out(1.7)", stagger: 0.15 }, "-=0.5");
    

    // --- Langkah 2: Buat Draggable dengan properti inertia dan snap ---
    Draggable.create(timelineRef, {
      type: 'x',
      edgeResistance: 0.9,
      bounds: containerRef.current,
      cursor: 'grab',
      activeCursor: 'grabbing',
      
      // Properti inertia diubah menjadi sebuah objek untuk konfigurasi lebih lanjut
      inertia: {
        // 'snap' akan membuat gerakan berhenti di titik terdekat dalam array
        snap: (endValue) => gsap.utils.snap(snapPoints, endValue)
      },

      onDrag: function() {
        const bgColors = timelineData.map(item => item.bgColor);
        const progress = gsap.utils.normalize(0, this.minX, this.x);
        const newColor = gsap.utils.interpolate(bgColors, progress);
        gsap.to(containerRef.current, { backgroundColor: newColor, duration: 0.5, ease: 'power2.out' });
      }
    });
  }, { scope: containerRef });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div 
        ref={containerRef} 
        style={{ backgroundColor: timelineData[0].bgColor }}
        className="w-full h-screen text-white overflow-hidden flex items-center relative"
      >
        <div className="absolute top-10 z-20 bg-black/50 p-3 rounded-lg items-center">
          <h1 className="text-2xl font-bold">Time Travel Informatika</h1>
          <p className="text-gray-300">Klik dan geser untuk menjelajah</p>
        </div>

        <div className="timeline-draggable flex items-center h-full px-16 z-10"> {/* Memberi class untuk selector GSAP */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-400 opacity-50 transform -translate-y-1/2" style={{ transformOrigin: 'left' }}></div>
          
          {timelineData.map((event, index) => {
            // Menentukan apakah posisi item ini di atas atau di bawah
            const isTopPosition = index % 2 !== 0;

            return (
              <div
                key={event.id}
                // PERBAIKAN UTAMA DI SINI:
                // 1. Seluruh grup diberi margin atas/bawah untuk memindahkannya
                // 2. 'flex-col-reverse' digunakan untuk item atas
                // 3. 'gap-y-4' memberi jarak konsisten antara titik dan kartu
                className={`flex items-center mx-8 flex-shrink-0 relative cursor-pointer group
                  ${isTopPosition ? 'flex-col-reverse -mb-25' : 'flex-col -mt-25'}
                `}
                onClick={() => handleEventClick(event)}
              >
                {/* Kartu Informasi (tidak ada lagi margin besar di sini) */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg w-64 text-center transition-transform duration-300 group-hover:scale-105">
                  <p className="text-2xl font-bold text-indigo-400">{event.year}</p>
                  <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                </div>

                {/* Titik Timeline */}
                <div className="w-6 h-6 bg-white rounded-full border-4 border-indigo-500 z-10 group-hover:scale-125 transition-transform duration-300"></div>

              </div>
            );
          })}
        </div>
      </div>
      
      {/* PERUBAIKAN 3: Menggunakan createPortal untuk "menteleportasi" modal.
        Hanya render portal jika ada event yang dipilih.
      */}
      {selectedEvent && createPortal(
        <EventModal event={selectedEvent} onClose={handleCloseModal} />,
        document.body // Target teleportasi: elemen <body> utama
      )}
    </>
  );
};

export default Timeline;