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
    <section className="relative h-[70vh] bg-gray-100">
      <Image
        src="/hero2.jpg"
        alt="Featured seasonal collection showcase"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={true}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60">
        <div className="h-full flex flex-col items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center text-white max-w-6xl mx-auto"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Seasonal Collections
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-12 max-w-xl mx-auto"
            >
              Discover our handpicked selections for every season
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 2) }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
                >
                  <feature.icon className="w-8 h-8 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-200">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/collections/featured">
                <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 font-medium">
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