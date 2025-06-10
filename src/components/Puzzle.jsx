// src/components/Timeline.jsx

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

import { timelineData } from '../components/timelineData';

gsap.registerPlugin(Draggable);

// Komponen Modal
const EventModal = ({ event, onClose }) => {
  const handleClose = (e) => { e.stopPropagation(); onClose(); };
  return (
    <div onClick={handleClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div onClick={(e) => e.stopPropagation()} className="m-5 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl max-w-lg w-full relative text-gray-800">
        <button onClick={handleClose} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-110">&times;</button>
        <img src={event.imageSrc} alt={event.title} className="w-full h-56 object-cover rounded-t-xl" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <p className="text-xl text-indigo-600 font-semibold mb-4">{event.year}</p>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// Komponen Utama Puzzle Timeline
// ====================================================================
const TimelinePuzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [correctlyPlaced, setCorrectlyPlaced] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const pieceRefs = useRef([]);

  useEffect(() => {
    const shuffleArray = (array) => {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    };
    setPieces(shuffleArray([...timelineData]));
  }, []);

  useGSAP(() => {
    pieceRefs.current.forEach((piece) => {
      if (piece) {
        Draggable.create(piece, {
          bounds: "body",
          cursor: 'grab',
          activeCursor: 'grabbing',
          onPress: function () {
            gsap.to(this.target, {
              zIndex: 100,
              scale: 1.1,
              duration: 0.2,
              ease: 'power2.out'
            });
          },
          onRelease: function () {
            gsap.to(this.target, {
              zIndex: 'auto',
              scale: 1,
              duration: 0.2
            });
          },
          onDragEnd: function () {
            const pieceId = parseInt(this.target.dataset.pieceId);
            let droppedCorrectly = false;

            gsap.utils.toArray('.puzzle-slot').forEach(slot => {
              const slotId = parseInt(slot.dataset.slotId);
              if (this.hitTest(slot, "50%")) {
                if (pieceId === slotId) {
                  droppedCorrectly = true;
                  const slotRect = slot.getBoundingClientRect();
                  const pieceRect = this.target.getBoundingClientRect();

                  gsap.to(this.target, {
                    x: this.x + (slotRect.left - pieceRect.left) + (slotRect.width - pieceRect.width) / 2,
                    y: this.y + (slotRect.top - pieceRect.top) + (slotRect.height - pieceRect.height) / 2,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                      this.disable();
                      gsap.set(this.target, { zIndex: 1 });
                      setCorrectlyPlaced(prev => ({ ...prev, [slotId]: pieceId }));
                      setSelectedEvent(timelineData.find(e => e.id === pieceId));
                    }
                  });
                }
              }
            });

            if (!droppedCorrectly) {
              gsap.to(this.target, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
            }
          }
        });
      }
    });
  }, [pieces]);

  // Deteksi saat semua puzzle sudah benar
  useEffect(() => {
    if (Object.keys(correctlyPlaced).length === timelineData.length) {
      setTimeout(() => {
        setShowCongrats(true);
      }, 500);
    }
  }, [correctlyPlaced]);

  const handleCloseModal = () => { setSelectedEvent(null); };

  return (
    <>
      <div className="w-full h-screen bg-gray-800 flex flex-col p-4 sm:p-8 overflow-hidden">
        <div className="text-center text-white mb-4">
          <h1 className="text-2xl sm:text-4xl font-bold">Timeline Puzzle Informatika</h1>
          <p className="text-gray-300">Susunlah peristiwa berikut sesuai urutan tahunnya!</p>
        </div>

        <div className="z-10 w-full bg-black/20 rounded-xl p-4 flex justify-center items-center flex-wrap gap-4">
          {timelineData.map(slot => (
            <div
              key={slot.id}
              data-slot-id={slot.id}
              className="puzzle-slot relative  w-48 h-24 bg-gray-700/50 border-2 border-dashed border-gray-500 rounded-lg flex flex-col justify-center items-center text-white"
            >
              {correctlyPlaced[slot.id] ? (
                <div className="w-full h-full p-2 bg-green-600 rounded-lg flex flex-col justify-center items-center text-center">
                  <p className="text-xl font-bold">{slot.year}</p>
                  <p className="text-sm font-semibold">{slot.title}</p>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-bold">{slot.year}</p>
                  <p className="text-xs text-gray-400">Tempatkan di sini</p>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="relative z-20 w-full sm:h-full h-48 bg-black/20 rounded-xl mt-4 p-4 flex justify-center items-center flex-wrap gap-4">
          {pieces.map((piece, index) => {
            if (correctlyPlaced[piece.id]) return null;
            return (
              <div
                key={piece.id}
                ref={el => pieceRefs.current[index] = el}
                data-piece-id={piece.id}
                className="puzzle-piece w-48 h-24 p-2 bg-indigo-600 rounded-lg text-white text-center flex justify-center items-center cursor-grab shadow-lg"
              >
                <h3 className="text-md font-semibold">{piece.title}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {selectedEvent && createPortal(
        <EventModal event={selectedEvent} onClose={handleCloseModal} />,
        document.body
      )}

      {/* Pop Up Es Teh */}
      {showCongrats && createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[99999]">
          <div className="bg-white text-green-700 text-center p-8 rounded-2xl shadow-2xl max-w-sm w-full animate-bounce-in">
            <h2 className="text-2xl font-bold mb-4">🎉 Selamat! 🎉</h2>
            <p className="text-lg">Anda berhasil menyusun semua puzzle dengan benar!</p>
            <p className="text-xl mt-2 font-semibold">🥤 Anda mendapat <span className="text-indigo-600">es teh</span>!</p>
            <button
              onClick={() => setShowCongrats(false)}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Tutup
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default TimelinePuzzle;
