'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { FaStar, FaShippingFast, FaPercent } from 'react-icons/fa';

export default function FeaturedBanner() {
  const features = [
    {
      icon: FaStar,
      title: "Premium Quality",
      description: "Curated selection of top-tier products"
    },
    {
      icon: FaShippingFast,
      title: "Fast Delivery",
      description: "Quick and reliable shipping"
    },
    {
      icon: FaPercent,
      title: "Special Offers",
      description: "Exclusive deals and discounts"
    }
  ];

  return (
    <section className="relative min-h-[500px] h-[70vh] bg-gray-100">
      <Image
        src="/hero2.jpg"
        alt="Featured seasonal collection showcase"
        fill
        className="object-cover object-center"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        priority={true}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60">
        <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center text-white w-full max-w-6xl mx-auto"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            >
              Seasonal Collections
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-sm sm:max-w-xl mx-auto px-4"
            >
              Discover our handpicked selections for every season
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 px-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 2) }}
                  className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg"
                >
                  <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="px-4"
            >
              <Link href="/collections/featured">
                <button className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 text-sm sm:text-base font-medium">
                  Explore Collection
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 