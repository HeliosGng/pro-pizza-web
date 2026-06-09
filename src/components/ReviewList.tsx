import { Review } from "../data";
import { TranslationSet } from "../translations";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface ReviewListProps {
  reviews: Review[];
  lang: "sq" | "en";
  translations: TranslationSet;
}

export function ReviewList({ reviews, lang, translations }: ReviewListProps) {
  return (
    <div className="py-16 bg-black/25 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-white/5 p-3 rounded-full border border-white/10 text-red-500 mb-4">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase italic tracking-tighter">
            {translations.reviewsTitle}
          </h2>
          <p className="mt-2 text-white/50 max-w-xl text-xs sm:text-sm">
            {lang === "en" 
              ? "See what some of our favorite guests have to say about our food quality and responsive services in Tirana."
              : "Shiko se çfarë thonë klientët tanë të dashur mbi cilësinë e ushqimit dhe shërbimin tonë fantastik në Tiranë."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-red-650/30 transition-colors shadow-2xl relative"
            >
              <div>
                {/* Score Stars */}
                <div className="flex items-center gap-1 text-red-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-white/10" />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-sans text-xs sm:text-sm text-white/80 italic leading-relaxed">
                  "{lang === "en" ? review.commentEn : review.commentSq}"
                </p>
              </div>

              {/* Author Row */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-white">
                    {review.author}
                  </h4>
                  <p className="text-[10px] text-white/30 font-mono mt-0.5 uppercase tracking-widest">
                    {review.type} • {review.count}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-white/30">
                  {lang === "en" ? review.dateEn : review.dateSq}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
