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
        className="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl max-w-lg w-full relative text-gray-800"
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
    // ... (Logika GSAP tidak perlu diubah) ...
    const timelineRef = containerRef.current.querySelector('.timeline-draggable');
    Draggable.create(timelineRef, {
        type: 'x',
        edgeResistance: 0.9,
        bounds: containerRef.current,
        inertia: true,
        cursor: 'grab',
        activeCursor: 'grabbing',
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
        <div className="absolute top-5 left-5 z-20 bg-black/50 p-3 rounded-lg">
          <h1 className="text-2xl font-bold">Time Travel Informatika</h1>
          <p className="text-gray-300">Klik dan geser untuk menjelajah</p>
        </div>

        <div className="timeline-draggable flex items-center h-full px-16 z-10"> {/* Memberi class untuk selector GSAP */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-400 opacity-50 transform -translate-y-1/2" style={{ transformOrigin: 'left' }}></div>
          
          {timelineData.map((event, index) => (
            <div 
              key={event.id} 
              className="flex flex-col items-center mx-16 flex-shrink-0 relative cursor-pointer group"
              onClick={() => handleEventClick(event)}
            >
              <div className="w-6 h-6 bg-white rounded-full border-4 border-indigo-500 z-10 group-hover:scale-125 transition-transform duration-300"></div>
              <div className={`p-4 bg-gray-800 rounded-lg shadow-lg w-64 text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-indigo-500/50 ${index % 2 !== 0 ? 'mb-40' : 'mt-40'}`}>
                <p className="text-2xl font-bold text-indigo-400">{event.year}</p>
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              </div>
            </div>
          ))}
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