import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
            <span className="text-luxury-gold">Perfume</span>
            <span className="text-foreground">Fort</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop/women" className="text-sm font-medium hover:text-luxury-gold transition-colors">
              Women
            </Link>
            <Link to="/shop/men" className="text-sm font-medium hover:text-luxury-gold transition-colors">
              Men
            </Link>
            <Link to="/shop/unisex" className="text-sm font-medium hover:text-luxury-gold transition-colors">
              Unisex
            </Link>
            <Link to="/shop/exclusive" className="text-sm font-medium hover:text-luxury-gold transition-colors">
              Exclusive
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/shop/women"
                className="text-sm font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Women's Perfumes
              </Link>
              <Link
                to="/shop/men"
                className="text-sm font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Men's Perfumes
              </Link>
              <Link
                to="/shop/unisex"
                className="text-sm font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Unisex Scents
              </Link>
              <Link
                to="/shop/exclusive"
                className="text-sm font-medium hover:text-luxury-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Exclusive Collections
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
