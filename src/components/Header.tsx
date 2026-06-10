import { TranslationSet } from "../translations";
import { Globe, Menu, ShieldCheck, ShoppingBag, Utensils, Star, PhoneCall, Instagram } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

interface HeaderProps {
  lang: "en" | "sq";
  setLang: (lang: "en" | "sq") => void;
  translations: TranslationSet;
  cartCount: number;
  onCartClick: () => void;
  heroImg: string;
}

export function Header({
  lang,
  setLang,
  translations,
  cartCount,
  onCartClick,
  heroImg,
}: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    const checkStatus = () => {
      try {
        const options = { timeZone: "Europe/Tirane", hour: "numeric", hour12: false } as const;
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const hr = parseInt(formatter.format(new Date()), 10);
        // Open daily from 10:00 to 24:00 (which is hour 10 through 23 inclusive)
        setIsOpen(hr >= 10 && hr < 24);
      } catch (e) {
        const hr = new Date().getHours();
        setIsOpen(hr >= 10 && hr < 24);
      }
    };

    checkStatus();
    // Update every 15 seconds to ensure accuracy
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const scrollToMenu = () => {
    const el = document.getElementById("menu-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFooter = () => {
    const el = document.getElementById("footer-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative w-full overflow-hidden bg-[#0d0606] text-white">
      {/* Top microbar with white/5 borders for Immersive UI */}
      <div className="bg-[#0a0505]/60 border-b border-white/5 py-2.5 text-[11px] font-mono text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 bg-red-950/40 px-2.5 py-0.5 rounded border border-red-900/30">
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-red-600 animate-pulse"}`}></span>
              <span className={`text-[10px] ${isOpen ? "text-green-400" : "text-red-400"} font-bold tracking-wider uppercase`}>
                {isOpen 
                  ? (lang === "en" ? "Open • Order Delivery & Takeout" : "Hapur • Transport & Merre Vetë")
                  : (lang === "en" ? "Closed • Opens at 10:00 AM" : "Mbyllur • Hapet në 10:00")
                }
              </span>
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="text-white/60 tracking-tight text-[10px] uppercase font-bold">Rruga Fortuzi 37, Tiranë</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+355684777766" className="flex items-center gap-1.5 text-white/80 hover:text-red-500 font-bold transition-colors">
              <PhoneCall className="w-3 h-3 text-red-500" />
              <span>+355 68 477 7766</span>
            </a>
            {/* Language switch configured with immersive minimalist buttons */}
            <div className="flex items-center gap-1 border border-white/5 bg-[#0a0505] px-2 py-0.5 rounded-md">
              <Globe className="w-3 h-3 text-white/30" />
              <button
                type="button"
                onClick={() => setLang("sq")}
                className={`text-[9px] uppercase font-bold tracking-widest px-1 cursor-pointer transition-colors ${
                  lang === "sq" ? "text-red-500 font-black" : "text-white/40 hover:text-white"
                }`}
              >
                SQ
              </button>
              <span className="text-white/10 text-[9px] select-none">/</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`text-[9px] uppercase font-bold tracking-widest px-1 cursor-pointer transition-colors ${
                  lang === "en" ? "text-red-500 font-black" : "text-white/40 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary navbar: styled according to top-tier layout patterns of the immersive template */}
      <nav className="bg-black/40 border-b border-white/5 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with uppercase italics and extreme black weights */}
          <div className="flex items-center gap-3">
            <div className="bg-red-650 px-2.5 py-0.5 text-[9px] font-black tracking-widest uppercase text-white hidden sm:block">
              Tiranë
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tighter uppercase italic">
              PRO <span className="text-red-600">PIZZA</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white/60">
            <button
              onClick={scrollToMenu}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              {lang === "en" ? "Menu" : "Menuja"}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("footer-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              {lang === "en" ? "Location & Hours" : "Adresa & Orari"}
            </button>
            <a
              href="https://wolt.com/en/alb/tirana/restaurant/pro-pizza?srsltid=AfmBOopri2ENWgvxB5oQxa9spA8DbWVG9rpz6E778rGMSTJx5lDkBvsY"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500 transition-colors text-red-500 font-extrabold"
            >
              Wolt Order
            </a>
            <a
              href="https://www.instagram.com/pro.pizza.al/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500 transition-colors text-pink-500 font-extrabold flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>

          {/* Quick actions & live status bar indicator */}
          <div className="flex items-center gap-4">
            
            {/* Live Indicator inside navbar */}
            <div className="hidden sm:flex items-center gap-3 pr-2">
              <div className="flex flex-col items-end">
                <span className={`text-[9px] uppercase tracking-tighter ${isOpen ? "text-green-500 font-extrabold" : "text-red-500 font-black"}`}>
                  {lang === "en" ? "Live Status" : "Statusi Live"}
                </span>
                <span className="text-xs font-bold text-white/80">
                  {isOpen 
                    ? (lang === "en" ? "Open • Under 12:00 AM" : "Hapur • Deri në 24:00")
                    : (lang === "en" ? "Closed • opens 10 AM" : "Mbyllur • Hapet në 10:00")
                  }
                </span>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "bg-red-600 animate-pulse"}`}></div>
            </div>

            {/* Shopping Cart button: Immersive UI variant */}
            <button
              onClick={onCartClick}
              className="relative p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white transition-all cursor-pointer select-none"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={scrollToMenu}
              className="hidden lg:inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-display font-black text-xs px-5 py-3 uppercase tracking-widest transition-all cursor-pointer"
            >
              {translations.orderNow}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero section styled according to Immersive UI rules */}
      <div className="relative w-full min-h-[400px] sm:min-h-[480px] md:min-h-[540px] flex items-center justify-center py-20 border-b border-white/5">
        {/* Background Image / Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Pro Pizza Banner"
            className="w-full h-full object-cover grayscale-[20%] contrast-[110%]"
          />
          {/* Subtle dark layout gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0606] via-[#0d0606]/85 to-transparent md:to-[#0d0606]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0606] via-transparent to-[#0d0606]/50" />
          {/* Red atmospheric light overlay */}
          <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[100px]" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-600 text-white font-display font-black text-[10px] tracking-widest uppercase px-3 py-1 w-fit shadow-md border border-white/10"
            >
              {translations.tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tighter uppercase italic leading-none"
            >
              {lang === "en" ? (
                <>
                  THE ULTIMATE <span className="text-red-500">PRO PIZZA</span>
                </>
              ) : (
                <>
                  MBI TË GJITHA <span className="text-red-500">PRO PICA</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/60 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-lg"
            >
              {translations.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-4 flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={scrollToMenu}
                className="bg-red-600 hover:bg-red-700 text-white font-display font-black text-xs px-8 py-4 uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl shadow-black/60"
              >
                {translations.orderNow}
              </button>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Pro+pizza,+Rruga+Fortuzi+37,+Tirana"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 text-xs font-display font-black uppercase text-center tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{translations.viewDirections}</span>
              </a>

              <a
                href="https://www.instagram.com/pro.pizza.al/"
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-pink-650/10 via-red-650/10 to-amber-500/10 hover:from-pink-650/20 hover:to-amber-500/20 text-pink-400 border border-pink-500/20 px-8 py-4 text-xs font-display font-black uppercase text-center tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </a>
            </motion.div>

            {/* Google Rating Stats aligned to Immersive template standards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-6 flex items-center gap-6 text-white/40 font-display text-[11px] uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-red-500 fill-current" />
                <span className="text-white font-bold">4.9 / 5.0</span>
                <span className="text-[10px] font-mono text-white/30">(92 reviews)</span>
              </div>
              <div className="text-white/10">|</div>
              <div>
                <span className="text-white font-black">{lang === "en" ? "PRICE CATEGORY" : "KATEGORIA ÇMIMIT"}</span>
                <span className="text-[10px] font-mono ml-2 text-red-500 font-bold">500–1,000 ALL</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
