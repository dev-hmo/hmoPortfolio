'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate network request
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass contact-form-wrapper"
    >
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input type="text" id="name" required placeholder=" " />
          <label htmlFor="name">Your Name</label>
        </div>
        
        <div className="form-group">
          <input type="email" id="email" required placeholder=" " />
          <label htmlFor="email">Your Email</label>
        </div>
        
        <div className="form-group">
          <textarea id="message" required placeholder=" " rows={5}></textarea>
          <label htmlFor="message">Your Message</label>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary form-submit"
          disabled={status !== 'idle'}
        >
          {status === 'idle' && 'Send Message'}
          {status === 'sending' && 'Sending...'}
          {status === 'sent' && 'Message Sent! ✨'}
        </button>
      </form>
    </motion.div>
  );
}
