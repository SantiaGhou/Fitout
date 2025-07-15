"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Como Funciona", href: "#how-it-works" },
    { label: "Começar", href: "#cta" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="text-2xl font-bold">
              <span className="text-white">fit</span>
              <span className="text-orange-500">out</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-gray-800"
              onClick={() => handleNavClick('#cta')}
            >
              Login
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              onClick={() => handleNavClick('#cta')}
            >
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md"
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                onClick={() => handleNavClick(item.href)}
                className="block text-gray-300 hover:text-white transition-colors duration-300 font-medium px-4 py-2 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full text-white hover:bg-gray-800"
                onClick={() => handleNavClick('#cta')}
              >
                Login
              </Button>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                onClick={() => handleNavClick('#cta')}
              >
                Começar Agora
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}