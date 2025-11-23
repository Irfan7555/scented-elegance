import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-luxury-warm border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              <span className="text-luxury-gold">Perfume</span>
              <span className="text-foreground">Fort</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Discover the world's finest luxury fragrances. Curated with passion, delivered with care.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:text-luxury-gold">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-luxury-gold">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-luxury-gold">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop/women" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Women's Perfumes
                </Link>
              </li>
              <li>
                <Link to="/shop/men" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Men's Perfumes
                </Link>
              </li>
              <li>
                <Link to="/shop/unisex" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Unisex Scents
                </Link>
              </li>
              <li>
                <Link to="/shop/exclusive" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Exclusive Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Help</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-luxury-gold transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive exclusive offers and fragrance tips.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-background"
              />
              <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Perfume Fort. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
