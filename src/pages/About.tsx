import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function About() {
  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#F9F8F6] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="md:sticky md:top-32 mt-10 md:mt-0"
        >
          <div className="relative group">
            <img
              src="/profile.png"
              alt="Mahí"
              className="w-full aspect-[4/5] object-cover rounded-sm filter grayscale contrast(1.2) brightness(0.95)"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col"
        >
          <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-orange-600 mb-4">The Artist</span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 flex flex-wrap">
            {[..."STUDIO'S"].map((letter, i) => {
              const colors = ["hover:text-orange-500", "hover:text-blue-400", "hover:text-pink-500", "hover:text-green-400", "hover:text-red-500", "hover:text-purple-500", "hover:text-yellow-400"];
              return (
                <span key={i} className={`${colors[i % colors.length]} transition-colors duration-200 cursor-default`}>
                  {letter}
                </span>
              );
            })}
            <div className="w-full md:hidden"></div>
            <span className="hidden md:inline-block md:w-4"></span>
            {[..."MAHÍ"].map((letter, i) => {
              const colors = ["hover:text-blue-500", "hover:text-orange-400", "hover:text-teal-500", "hover:text-rose-500"];
              return (
                <span key={i} className={`${colors[i % colors.length]} transition-colors duration-200 cursor-default`}>
                  {letter}
                </span>
              );
            })}
          </h1>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-600 font-serif font-extralight tracking-wide">
            <p className="border-l-2 border-orange-600 pl-6 my-10 not-italic font-normal text-gray-900 text-2xl md:text-3xl tracking-tight">
              "Every tote is a canvas, and every stroke tells a story of the wild."
            </p>
            <p>
              Based in her sun-drenched studio, Mahí Weber blends her passion for wildlife with artisanal craftsmanship. Each bag is meticulously hand-painted, ensuring that no two pieces are ever identical.
            </p>
            <p>
              Her work is inspired by the vibrant colors of nature and the raw beauty of animals. By using high-quality, sustainable canvas, Mahí creates wearable art that is as durable as it is beautiful.
            </p>
            <p>
              When she isn't painting, Mahí can be found at local artisanal markets, sharing her love for handcrafted goods with her community.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 flex gap-12">
            <div>
              <p className="text-xs font-mono uppercase text-gray-400 mb-2">Location</p>
              <p className="font-bold">The World</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-gray-400 mb-2">Specialty</p>
              <p className="font-bold">Painting</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
