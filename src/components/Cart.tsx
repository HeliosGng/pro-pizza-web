import { MenuItem } from "../data";
import { TranslationSet } from "../translations";
import { 
  ShoppingBag, Trash2, MapPin, User, Navigation, Send, ArrowRight, Minus, Plus 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface CartItem {
  id: string; // generated key, e.g. 'pizza-margherita-medium'
  menuItem: MenuItem;
  selectedSize?: "medium" | "family";
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  customerName: string;
  setCustomerName: (name: string) => void;
  address: string;
  setAddress: (address: string) => void;
  deliveryMethod: "delivery" | "takeout" | "dinein";
  setDeliveryMethod: (method: "delivery" | "takeout" | "dinein") => void;
  gpsCoords: { latitude: number; longitude: number } | null;
  gpsState: "idle" | "loading" | "success" | "failed";
  onAcquireGPS: () => void;
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  totalAmount: number;
  onSendToWhatsApp: () => void;
  translations: TranslationSet;
  lang: "en" | "sq";
}

export function Cart({
  cart,
  customerName,
  setCustomerName,
  address,
  setAddress,
  deliveryMethod,
  setDeliveryMethod,
  gpsCoords,
  gpsState,
  onAcquireGPS,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  totalAmount,
  onSendToWhatsApp,
  translations,
  lang,
}: CartProps) {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-black/60 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative" id="cart-container-box">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-650 rounded-sm"></span>
          <h2 className="font-display font-black text-sm uppercase tracking-widest text-white">
            {translations.yourCart}
          </h2>
        </div>
        
        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500/80" />
            <span>{lang === "en" ? "Clear" : "Pastro"}</span>
          </button>
        )}
      </div>

      {/* Cart Content */}
      <AnimatePresence mode="popLayout">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 flex flex-col items-center text-center px-4"
          >
            <div className="p-4 bg-white/5 text-red-500 rounded-full mb-4 border border-white/5">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <p className="font-sans text-xs text-white/50 uppercase tracking-wider">
              {translations.emptyCart}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* List of products */}
            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => {
                const isPizza = item.menuItem.category === "pizza";
                const itemPrice = isPizza 
                  ? (item.selectedSize === "family" ? item.menuItem.priceFamily : item.menuItem.priceMedium) || 0
                  : (item.menuItem.priceSq || item.menuItem.priceEn) || 0;
                
                const itemTotal = itemPrice * item.quantity;
                const name = lang === "en" ? item.menuItem.nameEn : item.menuItem.nameSq;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between gap-3 shadow-md hover:border-red-600/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 label-section">
                        <h4 className="font-display font-black text-xs uppercase italic text-white truncate">
                          {name}
                        </h4>
                      </div>
                      
                      {isPizza && (
                        <span className="text-[9px] text-red-500 font-display font-black uppercase tracking-wider block">
                          Size: {item.selectedSize === "family" ? translations.sizeFamily : translations.sizeMedium}
                        </span>
                      )}
                      
                      <div className="text-[11px] text-white/50 font-mono mt-0.5">
                        {itemPrice} ALL × {item.quantity} = <strong className="text-red-500 font-bold">{itemTotal} ALL</strong>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-black/60 border border-white/5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 px-2 text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-white px-1 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 px-2 text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 bg-white/5 hover:bg-red-600/20 text-red-500 rounded-lg transition-colors cursor-pointer border border-white/5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Extra additions warning */}
            <p className="text-[10px] text-white/40 italic font-sans border-t border-white/5 pt-2">
              {translations.customIngredientsNotice}
            </p>

            {/* Logistics & Delivery Selection */}
            <div className="border-t border-white/5 pt-4 space-y-4">
              <label className="block text-[10px] font-display font-black text-white/40 tracking-[0.2em] uppercase">
                {translations.customerNameLabel}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  required
                  placeholder={translations.customerNamePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-650 transition-colors"
                />
              </div>

              {/* Delivery Protocol */}
              <div className="space-y-2">
                <label className="block text-[10px] font-display font-black text-white/40 tracking-[0.2em] uppercase">
                  {translations.deliveryMethodLabel}
                </label>
                <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                  {(["delivery", "takeout", "dinein"] as const).map((method) => {
                    const label = method === "delivery" 
                      ? translations.deliveryOption 
                      : method === "takeout" 
                        ? translations.takeoutOption 
                        : translations.dineInOption;
                    
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setDeliveryMethod(method)}
                        className={`py-2 text-[10px] font-display font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                          deliveryMethod === method
                            ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Address input & GPS tracking (only for home delivery) */}
              {deliveryMethod === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden pt-1"
                >
                  <label className="block text-[10px] font-display font-black text-white/40 tracking-[0.2em] uppercase">
                    {translations.addressLabel}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                    <textarea
                      required
                      placeholder={translations.addressPlaceholder}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-650 transition-colors resize-none"
                    />
                  </div>

                  {/* Satellite GPS Coordinates Anchor */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={onAcquireGPS}
                      disabled={gpsState === "loading"}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[11px] font-display font-black uppercase tracking-wider border cursor-pointer select-none transition-all ${
                        gpsState === "success"
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-900/50"
                          : gpsState === "loading"
                            ? "bg-white/5 text-white/30 border-white/5"
                            : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                      }`}
                    >
                      <Navigation className={`w-3.5 h-3.5 text-red-500 ${gpsState === "loading" ? "animate-spin" : ""}`} />
                      <span>
                        {gpsState === "loading"
                          ? translations.requestingGPS
                          : gpsState === "success"
                            ? translations.gpsAcquired
                            : translations.getGPSBtn}
                      </span>
                    </button>
                    
                    {gpsState === "failed" && (
                      <p className="text-[10px] text-red-500 font-sans mt-1">
                        {translations.gpsFailed}
                      </p>
                    )}
                    {gpsState === "success" && gpsCoords && (
                      <p className="text-[9px] text-emerald-500 font-mono mt-1 text-center bg-emerald-950/20 py-1.5 border border-emerald-900/10 rounded">
                        GPS acquired: lat={gpsCoords.latitude.toFixed(6)}, lon={gpsCoords.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Calculations and Immersive checkout pay solid box */}
            <div className="border-t border-white/5 pt-4 space-y-4">
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between text-white/40 uppercase tracking-widest text-[10px]">
                  <span>{lang === "en" ? "Subtotal" : "Nëntotali"}</span>
                  <span className="font-mono text-white/80">{totalAmount} ALL</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between text-white/40 uppercase tracking-widest text-[10px]">
                    <span>{lang === "en" ? "Delivery Cost" : "Kosto e Dërgesës"}</span>
                    <span className="text-green-500 font-bold uppercase font-mono">
                      {lang === "en" ? "FREE" : "FALAS"}
                    </span>
                  </div>
                )}
              </div>

              {/* Pay Box from Immersive UI Template */}
              <div className="p-5 bg-red-600 rounded-2xl">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] uppercase font-black text-black/60 tracking-widest">Total to Pay</span>
                  <span className="text-2xl sm:text-3xl font-black italic text-white leading-none">{totalAmount} ALL</span>
                </div>
                <button
                  type="button"
                  onClick={onSendToWhatsApp}
                  id="whatsapp-submit-order-button"
                  className="w-full py-4 bg-black text-white hover:bg-neutral-950 font-black uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-colors text-xs rounded-xl"
                >
                  <span>{translations.sendToWhatsApp}</span>
                  <Send className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
