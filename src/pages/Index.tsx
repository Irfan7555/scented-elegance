import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { data: featuredPerfumes = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.getProducts(undefined, true)
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  // Seed data if empty (for demo)
  useQuery({
    queryKey: ['seed'],
    queryFn: api.seedData,
    retry: false,
    enabled: !isLoadingProducts && featuredPerfumes.length === 0
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked fragrances that embody elegance and sophistication
            </p>
          </motion.div>

          {isLoadingProducts ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredPerfumes.map((perfume, index) => (
                <ProductCard key={perfume.id} perfume={perfume} index={index} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/shop/all">
              <Button size="lg" variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-luxury-warm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Find the perfect scent for every occasion
            </p>
          </motion.div>

          {isLoadingCategories ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/shop/${category.slug}`}>
                    <div className="group relative h-64 rounded-sm overflow-hidden bg-luxury-black">
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 to-luxury-black/20" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-serif font-bold text-luxury-cream mb-2 group-hover:text-luxury-gold transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-luxury-cream/80">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Join Our Exclusive Circle
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Be the first to discover new fragrances, exclusive offers, and fragrance insights
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              />
              <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
