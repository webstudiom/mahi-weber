import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ShoppingBag, Plus, Check, RefreshCw as FlipIcon } from 'lucide-react';

const FULL_COLLECTION = [
  { id: '1', name: 'The Ducks', price: 10, image: '/1.png', backImage: '/1.1.png', desc: 'A pair of graceful friends sharing the canvas.', soldOut: true },
  { id: '2', name: 'The Dog', price: 10, image: '/2.png', backImage: '/2.2.png', desc: 'A faithful companion captured in soft brushstrokes.' },
  { id: '3', name: 'Wild Spirit', price: 10, image: '/3.png', backImage: '/3.3.png', desc: 'The essence of nature in its purest form.' },
  { id: '4', name: 'Musician Frogs', price: 10, image: '/4.png', backImage: '/4.4.png', desc: 'A melodic pair sharing a morning rhythm.' },
  { id: '5', name: 'Meditating Frog', price: 10, image: '/5.png', backImage: '/5.5.png', desc: 'Finding inner peace in the garden.' },
  { id: '6', name: 'Elephant Spirit', price: 10, image: '/6.png', backImage: '/6.6.png', desc: 'Quiet wisdom in soft strokes.', soldOut: true },
  { id: '7', name: 'Chilling Duck', price: 10, image: '/7.png', backImage: '/7.7.png', desc: 'Taking a moment to enjoy the water.' },
  { id: '8', name: 'Angry Bunny', price: 10, image: '/8.png', backImage: '/8.8.png', desc: 'Pure attitude in a fluffy package.' },
  { id: '9', name: 'Happy Fox', price: 10, image: '/9.png', backImage: '/9.9.png', desc: 'A burst of joy from the forest.' },
  { id: '10', name: 'Colorful Parrot', price: 10, image: '/10.png', backImage: '/10.10.png', desc: 'Vibrant plumage across the sky.' },
];

const PARALLAX_CLASSES = [
  'slower',
  'faster',
  'slower vertical',
  'slower slower-down',
  '',
  'slower',
  'faster1',
  'slower slower2',
  '',
  'slower last',
];

export default function Collection() {
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [flippedItems, setFlippedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    FULL_COLLECTION.forEach(item => {
      initial[item.id] = Math.random() > 0.5;
    });
    return initial;
  });
  const { items, addItem, removeItem } = useCartStore();

  const isSelected = (id: string) => items.some(item => item.id === id);

  const toggleItem = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    const selected = items.some(i => i.id === item.id);
    if (selected) {
      removeItem(item.id);
    } else {
      addItem({ 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        image: item.image, 
        description: item.desc 
      });
      setAddedItem(item.name);
      setTimeout(() => setAddedItem(null), 2000);
    }
  };

  const toggleFlip = (id: string) => {
    setFlippedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="parallax-external">
      {/* Added Notification */}
      <AnimatePresence>
        {addedItem && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] bg-black text-white px-8 py-3 rounded-full font-oswald text-xs uppercase tracking-widest shadow-2xl border border-white/20 flex items-center space-x-2"
          >
            <ShoppingBag size={14} className="text-orange-500" />
            <span>Added to bag: {addedItem}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="parallax-header pointer-events-none">
        <div className="flex flex-col md:flex-row items-center md:items-baseline md:space-x-4 mb-1 md:mb-2 justify-center md:justify-start">
          <span className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-mono opacity-40">— 10€ ALL UNIQUE PIECES —</span>
        </div>
        <p className="font-hand text-2xl md:text-4xl text-orange-600 italic text-center md:text-left">Animal Collection</p>
      </div>

      <div className="parallax-info pointer-events-none flex flex-col items-center md:items-end">
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center md:items-end justify-center"
        >
          <p className="text-[6px] md:text-[7px] uppercase tracking-[3px] font-bold opacity-40">Scroll to explore</p>
          <div className="hidden md:block w-8 h-[1px] bg-black mt-2 opacity-20"></div>
        </motion.div>
      </div>

      <div className="horizontal-scroll-wrapper">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {FULL_COLLECTION.map((item, index) => {
            const parallaxClass = PARALLAX_CLASSES[index % PARALLAX_CLASSES.length];
            const flipped = flippedItems[item.id];
            const selected = isSelected(item.id);

            return (
              <div key={item.id} className={`flex flex-col items-center img-wrapper ${parallaxClass}`}>
                <div className="parallax-link group relative w-fit mx-auto cursor-pointer" onClick={() => toggleFlip(item.id)}>
                  {/* Flip Container */}
                  <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative preserve-3d"
                  >
                    {/* Front Image Side */}
                    <div 
                      className="backface-hidden relative bg-white p-[1.5vh] shadow-[0_15px_50px_rgba(0,0,0,0.12)]"
                      style={{ transform: 'translateZ(1px)' }}
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className={`transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 will-change-[transform,filter] backface-hidden ${item.soldOut ? 'grayscale opacity-75' : ''}`} 
                        />
                        
                        {/* Sold Out Overlay */}
                        {item.soldOut && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <div className="bg-orange-600/90 text-white text-[10px] font-black uppercase tracking-[0.4em] px-4 py-2 rotate-[-15deg] shadow-2xl">
                              SOLD OUT
                            </div>
                          </div>
                        )}
                        
                        {/* Front Side Overlays (Visible on Hover) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                             <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 leading-none">{item.name}</h3>
                             <div className="flex justify-between items-end">
                               <p className="font-hand text-gray-300 text-[11px] italic leading-tight max-w-[80%]">{item.desc}</p>
                               <div className="flex items-center space-x-1.5 text-white/50 text-[7px] font-mono tracking-widest uppercase font-bold">
                                 <FlipIcon size={10} className="animate-pulse" /> <span>FLIP</span>
                               </div>
                             </div>
                          </div>
                          
                          <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 text-black text-[7px] font-black tracking-[0.2em] uppercase shadow-sm rounded-sm">
                             FRONT
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Image Side (Reverse) */}
                    <div 
                      className="absolute inset-0 backface-hidden bg-white p-[1.5vh] shadow-[0_15px_50px_rgba(0,0,0,0.12)]"
                      style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
                    >
                      <div className="w-full h-full bg-[#fcfaf2] shadow-inner overflow-hidden border-4 border-white/50 relative p-6 flex items-center justify-center">
                         <img 
                          src={item.backImage} 
                          alt={`${item.name} back`} 
                          className="w-full h-full object-contain img-in-color backface-hidden transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <h4 className="text-[8px] font-medium uppercase tracking-[0.3em] text-gray-400">{item.name}</h4>
                        </div>
                        
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black text-white text-[7px] font-black tracking-[0.2em] uppercase rounded-sm z-20">
                          REVERSE
                        </div>
                        <div className="absolute top-3 right-3 flex items-center space-x-1.5 text-black/40 text-[7px] font-mono uppercase font-bold tracking-widest z-20">
                          <FlipIcon size={10} /> <span>FLIP</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Elegant Add to Bag Button placed clearly below the frame */}
                <div className="mt-8 flex justify-center w-full px-4 relative" style={{ zIndex: 9999 }}>
                  <button 
                    disabled={item.soldOut}
                    className={`w-full max-w-[180px] py-1.5 px-6 rounded-full flex items-center justify-center space-x-3 transition-all duration-500 border text-[8px] font-black uppercase tracking-[0.2em] relative ${
                      item.soldOut
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : selected 
                          ? 'bg-orange-600 text-white border-orange-600 shadow-xl shadow-orange-500/20 scale-105 cursor-pointer pointer-events-auto' 
                          : 'bg-white text-black border-gray-100 hover:border-black hover:bg-black hover:text-white hover:scale-105 cursor-pointer pointer-events-auto'
                    }`}
                    style={{ zIndex: 10000 }}
                    onClick={(e) => {
                      if (item.soldOut) return;
                      e.preventDefault();
                      e.stopPropagation();
                      toggleItem(e, item);
                    }}
                  >
                    {item.soldOut ? (
                      <span>SOLD OUT</span>
                    ) : selected ? (
                      <>
                        <Check size={11} strokeWidth={3} className="animate-in zoom-in duration-300" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <Plus size={11} strokeWidth={2.5} />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>
                </div>
                  
                {/* Selection indicator bar at bottom */}
                {selected && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute -bottom-4 left-10 right-10 h-0.5 bg-orange-600/30 rounded-full z-50" 
                  />
                )}
              </div>
            );
          })}
          <div className="min-h-[100vh]"></div>
        </motion.div>
      </div>
    </main>
  );
}


