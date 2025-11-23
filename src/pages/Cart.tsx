import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  // This would typically use state management for the cart
  const isCartEmpty = true;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Shopping Cart</h1>
          
          {isCartEmpty ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-serif font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Discover our exclusive collection of luxury perfumes
              </p>
              <Link to="/shop/all">
                <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items would go here */}
              <div className="lg:col-span-2">
                {/* Cart items */}
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-luxury-warm p-6 rounded-sm">
                  <h2 className="text-xl font-serif font-semibold mb-4">Order Summary</h2>
                  {/* Summary details would go here */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
