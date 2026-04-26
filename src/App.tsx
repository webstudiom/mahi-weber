/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { useCartStore } from './store/useCartStore';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

function Navbar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (location.pathname === '/about') {
      if (latest > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-4 md:px-8 py-4 md:py-6 mix-blend-difference pointer-events-none">
      <motion.div 
        animate={{ 
          opacity: hidden ? 0 : 1,
          y: hidden ? -20 : 0
        }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:space-x-8 pointer-events-auto"
      >
        <Link to="/" className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white flex group duration-300">
          {[..."STUDIO'S"].map((letter, i) => {
            const colors = ["hover:text-orange-500", "hover:text-blue-400", "hover:text-pink-500", "hover:text-green-400", "hover:text-red-500", "hover:text-purple-500", "hover:text-yellow-400"];
            return (
              <span key={i} className={`${colors[i % colors.length]} transition-colors duration-200`}>
                {letter}
              </span>
            );
          })}
          <span className="w-2"></span>
          {[..."MAHÍ"].map((letter, i) => {
            const colors = ["hover:text-blue-500", "hover:text-orange-400", "hover:text-teal-500", "hover:text-rose-500"];
            return (
              <span key={i} className={`${colors[i % colors.length]} transition-colors duration-200`}>
                {letter}
              </span>
            );
          })}
        </Link>
      </motion.div>

      <Link to="/cart" className="relative pointer-events-auto text-white flex items-center space-x-2">
        <ShoppingBag size={20} className="md:w-[24px] md:h-[24px]" />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key={itemCount}
              className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
            >
              {itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-[#F9F8F6] min-h-screen text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}
