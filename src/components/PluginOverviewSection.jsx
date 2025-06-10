import React from 'react';

const plugins = [
  { name: "GSDevTools", type: "Premium", description: "Alat bantu visual debugging untuk animasi GSAP Anda. Sangat berguna untuk pengembangan." },
  { name: "SplitText", type: "Premium", description: "Memecah teks menjadi karakter, kata, atau baris untuk animasi teks yang sangat detail dan kreatif." },
  { name: "ScrollSmoother", type: "Premium", description: "Menciptakan efek scrolling yang sangat halus dan dapat diintegrasikan dengan ScrollTrigger untuk efek parallax lanjutan." },
  { name: "MorphSVGPlugin", type: "Premium", description: "Menganimasikan transisi (morphing) antara bentuk SVG yang berbeda." },
  { name: "DrawSVGPlugin", type: "Premium", description: "Menganimasikan goresan (stroke) SVG seolah-olah sedang digambar atau dihapus." },
  { name: "Flip", type: "Premium", description: "Menganimasikan perubahan state elemen (ukuran, posisi, dll.) dengan mulus (First, Last, Invert, Play)." },
  { name: "InertiaPlugin", type: "Premium", description: "Bekerja dengan Draggable untuk menambahkan efek 'lempar' (throw) dan gerakan berbasis fisika setelah interaksi pengguna." },
  { name: "Physics2DPlugin", type: "Premium", description: "Menambahkan simulasi fisika 2D ke animasi Anda (gravitasi, tumbukan, dll.)." },
  { name: "PhysicsPropsPlugin", type: "Premium", description: "Menganimasikan properti objek berdasarkan prinsip fisika sederhana (kecepatan, akselerasi)." },
  { name: "ScrambleTextPlugin", type: "Premium", description: "Menciptakan efek teks acak (scrambling) sebelum menampilkan teks akhir." },
  { name: "MotionPathHelper", type: "Premium (Bundled with GSDevTools)", description: "Editor visual untuk membuat dan mengubah MotionPaths langsung di browser." },
  { name: "Observer", type: "Free (Core)", description: "Plugin tingkat rendah untuk mendeteksi pergerakan scroll, mouse, atau sentuhan, memberikan kontrol granular untuk memicu animasi atau logika." },
  { name: "EaselPlugin", type: "Free (Core)", description: "Memudahkan integrasi GSAP dengan proyek Adobe Animate (sebelumnya Flash)." },
  { name: "PixiPlugin", type: "Free (Core)", description: "Mengizinkan GSAP menganimasikan properti objek PixiJS." },
  // TextPlugin, ScrollTrigger, ScrollToPlugin, Draggable, MotionPathPlugin sudah didemokan.
];

const PluginOverviewSection = () => {
  return (
    <section id="plugins" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Overview Plugin GSAP Lainnya</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plugins.map((plugin) => (
            <div key={plugin.name} className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-teal-400 mb-2">{plugin.name}
                {plugin.type === "Premium" && <span className="ml-2 text-xs bg-yellow-500 text-gray-900 font-bold py-1 px-2 rounded-full">Premium</span>}
                {plugin.type === "Free (Core)" && <span className="ml-2 text-xs bg-green-500 text-gray-900 font-bold py-1 px-2 rounded-full">Free</span>}
              </h3>
              <p className="text-gray-300">{plugin.description}</p>
              {plugin.type === "Premium" && (
                <p className="text-sm text-gray-500 mt-3">Memerlukan lisensi Club GreenSock.</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-12">
          Untuk menggunakan plugin premium, Anda memerlukan lisensi dari <a href="https://greensock.com/club/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Club GreenSock</a>.
          Beberapa plugin gratis mungkin juga memiliki fitur yang lebih lengkap dengan keanggotaan klub.
        </p>
      </div>
    </section>
  );
};

export default PluginOverviewSection;