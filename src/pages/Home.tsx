import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const MENU_ITEMS = [
  { 
    title: 'About', 
    path: '/about',
    image: '/1.1.png'
  },
  { 
    title: 'Collection', 
    path: '/collection',
    image: '/2.2.png'
  },
  { 
    title: 'Contact', 
    path: '/contact',
    image: '/3.3.png'
  },
  { 
    title: 'Shopping Cart', 
    path: '/cart',
    image: '/4.4.png'
  },
];

export default function Home() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main 
      className="h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#F9F8F6] relative"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Image Reveal */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 5,
              x: window.innerWidth < 768 ? mousePos.x - 60 : mousePos.x - 128, 
              y: window.innerWidth < 768 ? mousePos.y - 120 : mousePos.y - 160 
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="fixed pointer-events-none z-40 w-32 h-40 md:w-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-white"
          >
            <img src={hoveredImage} alt="Preview" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full relative py-10 flex flex-col gap-4">
        {/* Top Marquee (Forward) */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHoveredImage(item.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter mx-4 md:mx-10 hover:text-orange-600 transition-colors duration-300 relative z-10"
                  >
                    {item.title} —
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Middle Marquee (Backward) */}
        <div className="flex overflow-hidden group bg-[#1A1A1A] py-4">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap text-white"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHoveredImage(item.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="text-[12vw] md:text-[10vw] font-serif italic mx-4 md:mx-10 hover:text-orange-400 transition-colors duration-300 relative z-10"
                  >
                    {item.title} *
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Marquee (Forward) */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHoveredImage(item.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter mx-4 md:mx-10 hover:text-orange-600 transition-colors duration-300 outline-text relative z-10"
                    style={{ WebkitTextStroke: '1px #1A1A1A', color: 'transparent' }}
                  >
                    {item.title} —
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-[8px] md:text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40 max-w-[40%] md:max-w-none">
        Hand-painted Tote Bags / By STUDIO'S MAHÍ
      </div>
      <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 text-[8px] md:text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40">
        Est. 2024 / Artisanal
      </div>
    </main>
  );
}

