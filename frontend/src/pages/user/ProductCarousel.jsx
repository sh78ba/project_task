import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    heading: "Discover Our Exclusive Collection",
    description: "Explore the latest trends crafted just for you. Turn heads with our unique designs.",
    gradient: "from-pink-500 to-blue-500",
    button1: { text: "Learn More", link: "/about" },
    button2: { text: "Shop Now", link: "/shop" },
  },
  {
    id: 2,
    heading: "Exclusive Discounts Just for You!",
    description: "Get up to 50% off on your favorite items. Don't miss out on these limited-time offers!",
    gradient: "from-pink-500 to-blue-500",
    button1: { text: "View Discounts", link: "/shop" },
    button2: { text: "Shop Now", link: "/shop" },
  },
];

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative z-10 container mx-auto max-w-4xl px-4">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              className="bg-white/20 backdrop-blur-md border border-white/30 p-12 md:p-16 rounded-3xl shadow-2xl text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1
                className={`mb-6 text-5xl md:text-6xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r ${slide.gradient} text-transparent`}
              >
                {slide.heading}
              </h1>
              <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
                {slide.description}
              </p>
              <div className="space-x-4 flex justify-center">
                <Link to={slide.button1.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-10 py-3 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                  >
                    {slide.button1.text}
                  </motion.button>
                </Link>
                <Link to={slide.button2.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${slide.gradient} text-white hover:opacity-90 px-10 py-3 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all`}
                  >
                    {slide.button2.text}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
