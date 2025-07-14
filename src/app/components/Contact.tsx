'use client';

import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  contactInfo: {
    email: string;
    location: string;
    phone: string;
    linkedin?: string;
    github?: string;
  };
}

// Memoized component to prevent unnecessary re-renders
const Contact = memo(function Contact({ contactInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Memoized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Memoized form submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 3000);
  }, [formData]);

  useEffect(() => {
    const cards = document.querySelectorAll('.contact-glass-card');
    cards.forEach(card => {
      // Simplified hover animations for better performance
      const handleMouseEnter = () => {
        gsap.to(card, {
          background: "rgba(255,255,255,0.25)",
          boxShadow: "0 12px 40px 0 rgba(31,38,135,0.45)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          background: "rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
          duration: 0.3,
          ease: "power2.in",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4">
            Get in touch with me for any inquiries or collaborations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="animate-slide-in-left glass-card rounded-2xl p-4 sm:p-8 contact-glass-card w-full">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Let's work together
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              I'm currently available for data engineering opportunities and consulting projects. 
              If you have a data challenge that needs scalable solutions, 
              I'd love to hear about it.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white text-sm sm:text-base">Email</p>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white text-sm sm:text-base">Location</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{contactInfo.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white text-sm sm:text-base">Phone</p>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="mt-6 sm:mt-8 flex space-x-3 sm:space-x-4">
              {contactInfo.github && (
                <a 
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px]"
                  aria-label="Visit GitHub profile"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              )}
              {contactInfo.linkedin && (
                <a 
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px]"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              )}
            </div>
          </div>
          
          <div className="animate-slide-in-right glass-card rounded-2xl p-4 sm:p-8 contact-glass-card w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="glass-btn w-full font-medium disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-sm sm:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;