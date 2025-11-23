import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { perfumes, categories } from "@/lib/data";

const Shop = () => {
  const { category } = useParams();
  
  const filteredPerfumes = category && category !== 'all'
    ? perfumes.filter(p => p.category === category)
    : perfumes;

  const categoryInfo = categories.find(c => c.slug === category);
  const title = categoryInfo?.name || 'All Perfumes';
  const description = categoryInfo?.description || 'Explore our complete collection of luxury fragrances';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPerfumes.map((perfume, index) => (
              <ProductCard key={perfume.id} perfume={perfume} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPerfumes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No perfumes found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
