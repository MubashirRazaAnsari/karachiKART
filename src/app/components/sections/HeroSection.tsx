'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { FaBox, FaRecycle, FaTools } from 'react-icons/fa';

export default function HeroSection() {
  const options = [
    {
      title: "New Products",
      description: "Discover latest arrivals and trending items",
      href: "/new",
      icon: FaBox,
      color: "bg-blue-500"
    },
    {
      title: "Second Hand",
      description: "Quality pre-owned items at great prices",
      href: "/secondhand",
      icon: FaRecycle,
      color: "bg-green-500"
    },
    {
      title: "Services",
      description: "Professional services at your fingertips",
      href: "/services",
      icon: FaTools,
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Modern fashion and lifestyle"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      
      {/* Overlay and Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30">
        <div className="relative h-full flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto px-4 text-white text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Your One-Stop Shop
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
            >
              Explore our wide range of products and services
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {options.map((option, index) => (
                <Link href={option.href} key={option.title}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-200">{option.description}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 