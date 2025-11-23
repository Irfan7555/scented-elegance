import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Perfume } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

// Import all perfume images
import perfumeWomen1 from "@/assets/perfume-women-1.jpg";
import perfumeMen1 from "@/assets/perfume-men-1.jpg";
import perfumeUnisex1 from "@/assets/perfume-unisex-1.jpg";
import perfumeExclusive1 from "@/assets/perfume-exclusive-1.jpg";

const imageMap: Record<string, string> = {
  'perfume-women-1': perfumeWomen1,
  'perfume-men-1': perfumeMen1,
  'perfume-unisex-1': perfumeUnisex1,
  'perfume-exclusive-1': perfumeExclusive1,
};

interface ProductCardProps {
  perfume: Perfume;
  index?: number;
}

export const ProductCard = ({ perfume, index = 0 }: ProductCardProps) => {
  const formattedPrice = (perfume.price / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${perfume.id}`}>
        <div className="relative overflow-hidden rounded-sm bg-luxury-warm aspect-square mb-4">
          <img
            src={imageMap[perfume.image]}
            alt={perfume.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {perfume.featured && (
            <div className="absolute top-4 left-4 bg-luxury-gold text-luxury-black text-xs font-medium px-3 py-1 rounded-sm">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/10 transition-colors duration-300" />
        </div>
      </Link>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/product/${perfume.id}`}>
              <h3 className="font-serif font-semibold text-lg group-hover:text-luxury-gold transition-colors">
                {perfume.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{perfume.brand}</p>
          </div>
          <p className="font-medium whitespace-nowrap">{formattedPrice}</p>
        </div>
        
        <Button 
          size="sm" 
          className="w-full bg-luxury-black hover:bg-luxury-gold text-luxury-cream hover:text-luxury-black transition-all"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};
