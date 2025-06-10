// src/components/EventModal.jsx

import React from 'react';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  // Fungsi baru untuk menangani penutupan modal
  // Kita akan panggil ini dari tombol close dan backdrop
  const handleClose = (e) => {
    e.stopPropagation(); // PERBAIKAN BUG 1: Mencegah klik "tembus" ke elemen di belakang
    onClose();
  };

  return (
    // Backdrop
    <div 
      onClick={handleClose} // Menggunakan fungsi handleClose yang baru
      // PERBAIKAN TAMPILAN: Mengganti background hitam dengan efek blur yang lebih modern
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()} // Ini tetap sama, mencegah modal tertutup saat kontennya diklik
        className="bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl max-w-lg w-full relative text-gray-800"
      >
        {/* Tombol Close */}
        <button 
          onClick={handleClose} // Menggunakan fungsi handleClose yang baru
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-110"
        >
          &times;
        </button>
        
        {/* Bagian untuk gambar Anda */}
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

export default EventModal;