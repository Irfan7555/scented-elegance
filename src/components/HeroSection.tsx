import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-perfume.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury Perfume"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-luxury-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4"
          >
            Exclusive Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-serif font-bold text-luxury-cream mb-6 leading-tight"
          >
            The Art of
            <br />
            Luxury Fragrance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-luxury-cream/90 text-lg mb-8 leading-relaxed"
          >
            Discover exceptional perfumes crafted with the finest ingredients.
            Each bottle tells a unique story of elegance and sophistication.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-4"
          >
            <Link to="/shop/all">
              <Button 
                size="lg" 
                className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black font-medium px-8"
              >
                Explore Collection
              </Button>
            </Link>
            <Link to="/shop/exclusive">
              <Button 
                size="lg" 
                variant="outline"
                className="border-luxury-cream text-luxury-cream hover:bg-luxury-cream/10"
              >
                View Exclusives
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
