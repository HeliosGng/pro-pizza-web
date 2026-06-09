import { PRODUCTS, REVIEWS, MenuItem } from "./data";
import { TRANSLATIONS } from "./translations";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { ReviewList } from "./components/ReviewList";
import { Footer } from "./components/Footer";
import { 
  Search, ShoppingBag, X, ChevronUp, Utensils, ThumbsUp, MapPin, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useMemo, useEffect } from "react";

// Relative path to the generated high quality dark red pizza image
// @ts-ignore
import heroBgImage from "./assets/images/pro_pizza_hero_1781043455701.png";

interface CartItem {
  id: string; // e.g. "pizza-margherita-medium" or "drink-cola"
  menuItem: MenuItem;
  selectedSize?: "medium" | "family";
  quantity: number;
}

export default function App() {
  const [lang, setLang] = useState<"en" | "sq">("sq");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<"all" | "pizza" | "sandwiches" | "drinks">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Customer delivery details
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "takeout" | "dinein">("delivery");
  
  // GPS Geolocation state
  const [gpsCoords, setGpsCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [gpsState, setGpsState] = useState<"idle" | "loading" | "success" | "failed">("idle");
  
  // Cart UI States (Desktop & Mobile)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Active user selections
  const translations = useMemo(() => TRANSLATIONS[lang], [lang]);

  // Handle scroll events for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Cart changes, or local preferences
  useEffect(() => {
    const savedCart = localStorage.getItem("pro_pizza_cart_v1");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Local cart loading failed");
      }
    }
  }, []);

  const saveCartToLocalStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("pro_pizza_cart_v1", JSON.stringify(newCart));
  };

  // GPS Acquisition
  const handleAcquireGPS = () => {
    setGpsState("loading");
    if (!navigator.geolocation) {
      setGpsState("failed");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGpsState("success");
      },
      (error) => {
        console.error("GPS lock failed", error);
        setGpsState("failed");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Add item to cart
  const handleAddToCart = (product: MenuItem, size?: "medium" | "family") => {
    const cartItemId = product.category === "pizza" && size 
      ? `${product.id}-${size}` 
      : product.id;

    const existingItem = cart.find((item) => item.id === cartItemId);
    let updatedCart: CartItem[] = [];

    if (existingItem) {
      updatedCart = cart.map((item) => 
        item.id === cartItemId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: cartItemId,
          menuItem: product,
          selectedSize: product.category === "pizza" ? size || "medium" : undefined,
          quantity: 1,
        }
      ];
    }
    saveCartToLocalStorage(updatedCart);
  };

  // Query item count in cart
  const getProductCartCount = (product: MenuItem, size?: "medium" | "family") => {
    const cartItemId = product.category === "pizza" && size 
      ? `${product.id}-${size}` 
      : product.id;
    return cart.find((item) => item.id === cartItemId)?.quantity || 0;
  };

  // Update item quantity in checkout
  const handleUpdateQuantity = (cartItemId: string, change: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === cartItemId) {
        const nextQty = item.quantity + change;
        return { ...item, quantity: Math.max(0, nextQty) };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    saveCartToLocalStorage(updatedCart);
  };

  // Remove single item completely
  const handleRemoveItem = (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    saveCartToLocalStorage(updatedCart);
  };

  // Clear cart completely
  const handleClearCart = () => {
    saveCartToLocalStorage([]);
  };

  // Subtotal in Lekë
  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => {
      const isPizza = item.menuItem.category === "pizza";
      const unitPrice = isPizza
        ? (item.selectedSize === "family" ? item.menuItem.priceFamily : item.menuItem.priceMedium) || 0
        : (item.menuItem.priceSq || item.menuItem.priceEn) || 0;
      return sum + unitPrice * item.quantity;
    }, 0);
  }, [cart]);

  // Filtered menu search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const categoryMatch = filterCategory === "all" || item.category === filterCategory;
      
      const query = searchQuery.toLowerCase();
      const nameEn = item.nameEn.toLowerCase();
      const nameSq = item.nameSq.toLowerCase();
      const descEn = item.descriptionEn.toLowerCase();
      const descSq = item.descriptionSq.toLowerCase();

      const searchMatch = !searchQuery || 
        nameEn.includes(query) || 
        nameSq.includes(query) || 
        descEn.includes(query) || 
        descSq.includes(query);

      return categoryMatch && searchMatch;
    });
  }, [filterCategory, searchQuery]);

  // Send Order to Pizzeria via WhatsApp
  const handleSendToWhatsApp = () => {
    if (cart.length === 0) return;

    // Direct WhatsApp phone of Pro Pizza Tirana (Rruga Fortuzi)
    const WA_PHONE = "355684777766";
    const DIVIDER = "--------------------------------\n";
    
    let text = `🍕 *POROSI E RE - PRO PIZZA (TIRANË)* 🍕\n`;
    text += DIVIDER;
    text += `👤 *Klienti:* ${customerName || (lang === "en" ? "Guest Visitor" : "Vizitor i Paidentifikuar")}\n`;
    text += `📦 *Mënyra e marrjes:* ${
      deliveryMethod === "delivery" 
        ? "Dërgesë në Shtëpi 🛵" 
        : deliveryMethod === "takeout" 
          ? "Merre Vetë (Takeout) 🛍️" 
          : "Në Pizzeri (Dine-In) 🍽️"
    }\n`;

    if (deliveryMethod === "delivery") {
      text += `📍 *Adresa e Dorëzimit:* ${address || (lang === "en" ? "Not specified" : "E paspecifikuar")}\n`;
      if (gpsCoords) {
        text += `🌍 *Vendndodhja (Harta GPS):* https://www.google.com/maps?q=${gpsCoords.latitude},${gpsCoords.longitude}\n`;
      } else {
        text += `🌍 *Vendndodhja (GPS):* Nuk u bashkëngjit GPS lëvizës\n`;
      }
    }

    text += `\n🛒 *ARTIKUJT E POROSITUR:* \n`;
    text += DIVIDER;

    cart.forEach((item) => {
      const isPizza = item.menuItem.category === "pizza";
      const sizeLabel = isPizza 
        ? item.selectedSize === "family" ? "FAMILJARE (Family)" : "E MESME (Medium)" 
        : "";
      
      const unitPrice = isPizza
        ? (item.selectedSize === "family" ? item.menuItem.priceFamily : item.menuItem.priceMedium) || 0
        : (item.menuItem.priceSq || item.menuItem.priceEn) || 0;

      const itemTotal = unitPrice * item.quantity;
      const itemName = item.menuItem.nameSq; // Albanian name for local delivery riders

      text += `👉 *${item.quantity}x ${itemName}* \n`;
      if (isPizza) {
        text += `   Madhësia: _${sizeLabel}_\n`;
      }
      text += `   [ ${unitPrice} ALL për njësi ] = *${itemTotal} ALL*\n\n`;
    });

    text += DIVIDER;
    text += `💰 *TOTALI PËR T'U PAGUAR:* *${totalAmount} ALL*\n`;
    if (deliveryMethod === "delivery") {
      text += `🛵 *Transporti:* *TAXI FALAS*\n`;
    }
    text += DIVIDER;
    text += "⚡ _Dërguar nga sistemi i porosive online - Pro Pizza Tirana_";

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${WA_PHONE}?text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  const totalItemsCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-[#0a0505] text-[#f3e9ea] font-sans relative overflow-hidden">
      
      {/* Background Atmosphere Spotlights from Immersive UI Template */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[50vh] h-[50vh] bg-red-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] left-[-10%] w-[60vh] h-[60vh] bg-red-650/10 rounded-full blur-[150px]" />
      </div>

      {/* Header section with brand, layout banner and lang toggler */}
      <Header
        lang={lang}
        setLang={setLang}
        translations={translations}
        cartCount={totalItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        heroImg={heroBgImage}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Unified Food Menu Section */}
        <div className="space-y-6" id="menu-section">
            
            {/* Filter Search Section with Immersive UI styling */}
            <div className="bg-white/5 border border-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col xl:flex-row items-center justify-between gap-4">
              
              {/* Category Filter tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full xl:w-auto">
                {([
                  { key: "all", label: translations.allSection },
                  { key: "pizza", label: translations.pizzaSection },
                  { key: "sandwiches", label: translations.sandwichSection },
                  { key: "drinks", label: translations.drinksSection },
                ] as const).map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setFilterCategory(cat.key);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
                      filterCategory === cat.key
                        ? "bg-red-600 text-white shadow-lg shadow-red-950/40"
                        : "bg-white/5 border border-white/5 text-white/40 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full xl:w-72">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder={lang === "en" ? "Search delicacies..." : "Kërko nga menuja..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-650 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3.5 text-white/40 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Products grid */}
            <div className="relative">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white/5 border border-white/5 rounded-2xl">
                  <Utensils className="w-12 h-12 text-white/20 mx-auto animate-pulse mb-3" />
                  <p className="text-white/40 font-sans text-xs sm:text-sm">
                    {lang === "en" 
                      ? "No delicacies matched your search constraints. Try other words."
                      : "Nuk u gjet asnjë produkt për këtë kërkim. Provoni terma të tjerë."}
                  </p>
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        lang={lang}
                        translations={translations}
                        onAddToCart={handleAddToCart}
                        cartCount={getProductCartCount}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </main>

      {/* Reviews Block */}
      <ReviewList
        reviews={REVIEWS}
        lang={lang}
        translations={translations}
      />

      {/* Footer info/map */}
      <Footer
        lang={lang}
        translations={translations}
      />

      {/* PERSISTENT INTERACTIVE FLOATING CART BUTTON (DESKTOP & MOBILE) */}
      <AnimatePresence>
        {totalItemsCount > 0 && (
          <motion.button
            initial={{ scale: 0.7, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 50, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-red-650 hover:bg-red-600 text-white px-5 py-4 rounded-xl shadow-[0_10px_35px_rgba(220,38,38,0.5)] flex items-center gap-3.5 border border-white/10 cursor-pointer select-none transition-shadow"
            id="floating-cart-anchor"
          >
            <div className="relative flex items-center justify-center bg-black/40 p-2.5 rounded-lg border border-white/5">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-red-650 font-mono text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-scale">
                {totalItemsCount}
              </span>
            </div>
            
            <div className="text-left font-display">
              <div className="text-[9px] font-black tracking-[0.18em] uppercase text-white/50 leading-none">
                {translations.yourCart}
              </div>
              <div className="text-sm font-black tracking-tight mt-1 font-mono">
                {totalAmount} ALL
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Unified Sidebar Slide-in Drawer (Desktop & Mobile) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Slide container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full sm:max-w-md md:max-w-lg bg-[#0a0505] border-l border-white/10 shadow-2xl flex flex-col h-full z-50 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-600 rounded-sm inline-block"></span>
                  <h3 className="font-display font-black text-xs text-white uppercase tracking-[0.2em]">
                    {translations.yourCart}
                  </h3>
                  {totalItemsCount > 0 && (
                    <span className="bg-red-650 text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-[10px] font-display font-black tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "Close" : "Mbyll"}</span>
                </button>
              </div>

              {/* Drawer Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                <Cart
                  cart={cart}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  address={address}
                  setAddress={setAddress}
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  gpsCoords={gpsCoords}
                  gpsState={gpsState}
                  onAcquireGPS={handleAcquireGPS}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                  totalAmount={totalAmount}
                  onSendToWhatsApp={() => {
                    handleSendToWhatsApp();
                    setIsCartOpen(false);
                  }}
                  translations={translations}
                  lang={lang}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shifted Back to top scroll bubble */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-28 right-6 sm:right-8 z-30 p-3 bg-white/5 backdrop-blur-md text-white rounded-xl shadow-xl hover:bg-white/10 active:scale-95 transition-all text-xs flex items-center justify-center cursor-pointer border border-white/10"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
