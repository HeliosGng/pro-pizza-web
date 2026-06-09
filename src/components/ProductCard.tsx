import { MenuItem } from "../data";
import { TranslationSet } from "../translations";
import { Plus, Check, Star } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

interface ProductCardProps {
  key?: React.Key;
  product: MenuItem;
  lang: "en" | "sq";
  translations: TranslationSet;
  onAddToCart: (product: MenuItem, size?: "medium" | "family") => void;
  cartCount: (product: MenuItem, size?: "medium" | "family") => number;
}

export function ProductCard({
  product,
  lang,
  translations,
  onAddToCart,
  cartCount,
}: ProductCardProps) {
  const isPizza = product.category === "pizza";
  const [selectedSize, setSelectedSize] = React.useState<"medium" | "family">("medium");

  const name = lang === "en" ? product.nameEn : product.nameSq;
  const description = lang === "en" ? product.descriptionEn : product.descriptionSq;
  const tags = lang === "en" ? product.tagsEn : product.tagsSq;

  const handleAdd = () => {
    onAddToCart(product, isPizza ? selectedSize : undefined);
  };

  const count = cartCount(product, isPizza ? selectedSize : undefined);

  return (
    <motion.div
       layout
       initial={{ opacity: 0, y: 15 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -15 }}
       transition={{ duration: 0.3 }}
       className="relative flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:border-red-600/50 transition-all duration-300 group"
       id={`product-card-${product.id}`}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden bg-stone-900/60 border-b border-white/5">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0606] via-transparent to-black/30" />
        
        {/* Skewed Popular Banner from the design template */}
        {product.isPopular && (
          <div className="absolute top-4 -right-1.5 bg-red-600 text-white font-display font-black text-[9px] px-3 py-1 rotate-6 shadow-lg z-10 border border-white/10 uppercase tracking-widest">
            {translations.popular}
          </div>
        )}

        {/* Badges / Tags in minimalist translucent style */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-black/60 text-white/90 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-black text-xl text-white group-hover:text-red-500 transition-colors uppercase italic tracking-tighter leading-snug">
            {name}
          </h3>
          <p className="mt-2 text-xs text-white/50 leading-relaxed font-sans line-clamp-2 min-h-[2rem]">
            {description}
          </p>
        </div>

        <div className="mt-4 space-y-4">
          {/* Pizza Size Selectors - Translucent glass style */}
          {isPizza && (
            <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setSelectedSize("medium")}
                className={`py-2 text-[10px] font-display font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedSize === "medium"
                    ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {translations.sizeMedium}
                <div className="text-[9px] font-mono font-medium opacity-75">{product.priceMedium} ALL</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize("family")}
                className={`py-2 text-[10px] font-display font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedSize === "family"
                    ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {translations.sizeFamily}
                <div className="text-[9px] font-mono font-medium opacity-75">{product.priceFamily} ALL</div>
              </button>
            </div>
          )}

          {/* Add to Cart button or Active counter & single price */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {!isPizza && (
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-display font-bold">
                  {translations.price}
                </span>
                <span className="text-lg font-mono font-bold text-red-500">
                  {product.priceSq || product.priceEn} ALL
                </span>
              </div>
            )}
            
            {isPizza && (
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-display font-bold">
                  {translations.price}
                </span>
                <span className="text-lg font-mono font-bold text-red-500">
                  {selectedSize === "family" ? product.priceFamily : product.priceMedium} ALL
                </span>
              </div>
            )}

            <button
              onClick={handleAdd}
              className={`relative flex items-center justify-center gap-1.5 px-5 py-3 text-[11px] font-display font-black uppercase tracking-widest rounded transition-all duration-200 cursor-pointer ${
                count > 0
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {count > 0 ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {translations.added} ({count})
                  </span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{translations.addToCart}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
