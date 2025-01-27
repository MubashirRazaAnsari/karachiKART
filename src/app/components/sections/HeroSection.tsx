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
    <section className="relative w-full min-h-[500px] h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/feature4.jpg"
        alt="Modern fashion and lifestyle"
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
      
      {/* Overlay and Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30">
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto text-white text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 mt-16 sm:mt-20"
            >
              Your One-Stop Shop
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto px-4"
            >
              Explore our wide range of products and services
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4"
            >
              {options.map((option, index) => (
                <Link href={option.href} key={option.title}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className={`${option.color} w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <option.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-200">{option.description}</p>
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