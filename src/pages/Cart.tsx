import { useCartStore } from '../store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, total, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#F9F8F6]">
        <div className="text-center p-12 bg-white border-2 border-dashed border-gray-300 rounded-3xl max-w-md">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">It looks like you haven't added any hand-painted treasures yet.</p>
          <Link
            to="/collection"
            className="inline-flex items-center space-x-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#F9F8F6] relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 overflow-hidden">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center shadow-sm border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl mb-4 sm:mb-0"
                  />
                  <div className="flex-1 sm:ml-6 text-center sm:text-left">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="text-gray-500 text-xs md:text-sm italic font-serif">Hand-painted unique piece</p>
                    <div className="flex items-center justify-center sm:justify-start mt-4 space-x-4 md:space-x-6">
                      <div className="flex items-center bg-gray-50 rounded-full px-3 py-1 border border-gray-100">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mr-2">Qty:</span>
                        <span className="text-xs font-black">1</span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1 group"
                      >
                        <Trash2 size={14} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-[8px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-right sm:ml-6 mt-4 sm:mt-0">
                    <p className="text-lg md:text-xl font-bold">€{item.price * item.quantity}</p>
                    <p className="text-[10px] text-gray-400 mt-1">€{item.price} each</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-black sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">€{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Calculated at checkout</span>
                </div>
                <div className="border-t-2 border-black border-dashed pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-mono uppercase text-gray-400">Total Price</p>
                    <p className="text-4xl font-black text-orange-600">€{total}</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact" 
                state={{ message: `Hello Mahi, I would like to order: ${items.map(i => `${i.name} (x${i.quantity})`).join(', ')}. Total: €${total}` }}
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
              >
                Checkout Now
              </Link>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-6">
                Secure payment / Artisanal quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
