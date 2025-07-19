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

const Contact = memo(function Contact({ contactInfo }: ContactProps) {
  // ... (state and handlers remain unchanged)

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Contact Information</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4">
            Reach me through these channels
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="glass-card rounded-2xl p-8 contact-glass-card max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="space-y-8 w-full">
                {/* Email - centered */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white text-base">Email</p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-base break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                {/* Location - centered */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white text-base">Location</p>
                    <p className="text-slate-600 dark:text-slate-300 text-base">{contactInfo.location}</p>
                  </div>
                </div>
                
                {/* Phone - centered */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white text-base">Phone</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-base"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social links - centered */}
              <div className="mt-10 flex justify-center space-x-4">
                {contactInfo.github && (
                  <a 
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    aria-label="Visit GitHub profile"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {contactInfo.linkedin && (
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    aria-label="Visit LinkedIn profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
