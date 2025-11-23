import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

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

const ProductDetail = () => {
  const { id } = useParams();

  const { data: perfume, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id!),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Product Not Found</h1>
            <Link to="/shop/all">
              <Button>Return to Shop</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedPrice = (perfume.price / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-sm overflow-hidden bg-luxury-warm"
            >
              <img
                src={perfume.image.startsWith('http') ? perfume.image : imageMap[perfume.image]}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <div className="flex-1">
                <p className="text-sm text-luxury-gold tracking-wider uppercase mb-2">
                  {perfume.category}
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  {perfume.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">{perfume.brand}</p>

                <div className="text-3xl font-bold mb-8">{formattedPrice}</div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {perfume.description}
                </p>

                {/* Fragrance Notes */}
                <div className="space-y-6 mb-8 p-6 bg-luxury-warm rounded-sm">
                  <div>
                    <h3 className="font-serif font-semibold mb-3">Top Notes</h3>
                    <div className="flex flex-wrap gap-2">
                      {perfume.notes.top.map((note) => (
                        <span
                          key={note}
                          className="text-sm px-3 py-1 bg-background rounded-full"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold mb-3">Heart Notes</h3>
                    <div className="flex flex-wrap gap-2">
                      {perfume.notes.heart.map((note) => (
                        <span
                          key={note}
                          className="text-sm px-3 py-1 bg-background rounded-full"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold mb-3">Base Notes</h3>
                    <div className="flex flex-wrap gap-2">
                      {perfume.notes.base.map((note) => (
                        <span
                          key={note}
                          className="text-sm px-3 py-1 bg-background rounded-full"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <p className={`text-sm ${perfume.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {perfume.inStock ? '✓ In Stock' : 'Out of Stock'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main >

      <Footer />
    </div >
  );
};

export default ProductDetail;
