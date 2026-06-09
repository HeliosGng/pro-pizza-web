import { TranslationSet } from "../translations";
import { MapPin, Phone, Clock, Compass, HelpCircle, Utensils, Instagram } from "lucide-react";
import React from "react";

interface FooterProps {
  lang: "sq" | "en";
  translations: TranslationSet;
}

export function Footer({ lang, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050202] border-t border-white/5 text-white/40 py-16 relative z-10" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-2xl text-white tracking-widest uppercase italic flex items-center gap-2">
              <span className="text-red-500">PRO</span> PIZZA
            </h3>
            <p className="text-xs sm:text-sm text-white/50 font-sans leading-relaxed">
              {lang === "en"
                ? "The ultimate destination for premium Italian pizza, crafted and prepared with absolute dedication in the heart of Tirana. Always loaded with high-quality fresh ingredients."
                : "Destinacioni kryesor për pica italiane premium, të gatuara me përkushtim absolut në zemër të Tiranës. Gjithmonë të mbushura me përbërës të freskët dhe cilësorë."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] font-display font-black uppercase tracking-wider text-red-500 bg-white/5 border border-white/10 w-fit px-3 py-2 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                {translations.deliveryNotice}
              </div>
              <a
                href="https://www.instagram.com/pro.pizza.al/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-display font-black uppercase tracking-wider text-pink-500 hover:text-pink-400 bg-white/5 border border-white/10 hover:border-pink-500/25 px-3 py-2 rounded-lg transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs sm:text-sm text-white tracking-[0.2em] uppercase">
              {translations.findUs}
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Pro+pizza,+Rruga+Fortuzi+37,+Tirana" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-red-500 transition-colors"
              >
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-white/60">Rruga Fortuzi 37, Tiranë, Albania</span>
              </a>

              <a 
                href="tel:+355684777766" 
                className="flex items-center gap-2.5 hover:text-red-500 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-white/60">+355 68 477 7766</span>
              </a>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-white/60">{translations.hours}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Pro+pizza,+Rruga+Fortuzi+37,+Tirana"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-lg text-xs font-display font-black tracking-widest uppercase transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                {translations.viewDirections}
              </a>
            </div>
          </div>

          {/* Embedded Map Visual */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs sm:text-sm text-white tracking-[0.2em] uppercase">
              {translations.contactUs}
            </h4>
            <div className="relative h-32 rounded-xl overflow-hidden border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.115849887704!2d19.8130833!3d41.3283333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031023fe52e25%3A0xe53cc6470870be8e!2sPro%20pizza!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-50 hover:opacity-85 transition-opacity" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[10px] font-mono text-white/30 lowercase italic">
              {translations.metaSecureNotice}
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30 uppercase tracking-wider">
          <p>© {currentYear} Pro Pizza Tirana. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-red-500" />
              10:00 - 24:00 (Daily)
            </span>
            <span>Rruga Fortuzi 37</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
