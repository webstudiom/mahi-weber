import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Mail, Send } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (location.state?.message) {
      setFormData(prev => ({ ...prev, message: location.state.message }));
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Using the Formspree Form ID provided by the user
      const endpoint = 'https://formspree.io/f/xaqavrdj'; 
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error sending your message.');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#F9F8F6] relative">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Get in Touch</h1>
          <p className="text-xs md:text-sm font-mono uppercase tracking-widest mt-4">Commission a piece or say hello</p>
          <p className="text-xs font-mono uppercase text-orange-600 mt-2">mah_web@outlook.de</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border-2 border-black shadow-xl">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Sent!</h3>
              <p className="text-gray-600 mt-2">Mahi will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-2 border-black p-4 focus:bg-orange-50 transition-colors outline-none font-bold"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border-2 border-black p-4 focus:bg-orange-50 transition-colors outline-none font-bold"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border-2 border-black p-4 focus:bg-orange-50 transition-colors outline-none font-bold"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border-2 border-black p-4 focus:bg-orange-50 transition-colors outline-none font-bold"
                  placeholder="What's on your mind?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1A1A1A] text-white p-5 font-black uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
