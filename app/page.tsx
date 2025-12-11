"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Create a motion-wrapped Image component
const MotionImage = motion(Image);
import { X, ArrowDown, Mail, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

// Type definitions
type PortfolioItem = {
  id: number;
  src: string;
  settings: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    src: "/images/prity2.jpg",
    settings: "50mm • f/1.8 • Sony A7III"
  },
  {
    id: 2,
    src: "/images/cathedral.jpg",
    settings: "24mm • f/8 • Sony A6700"
  },
  {
    id: 3,
    src: "/images/doggo.jpg",
    settings: "85mm • f/2.8 • Sony A6700"
  },

  {
    id: 4,
    src: "/images/orange.jpg",
    settings: "35mm • f/2.8 • Sony A6700"
  },
  {
    id: 5,
    src: "/images/baby.jpg",
    settings: "70mm • f/5.6 • Sony A7III"
  },
  {
    id: 6,
    src: "/images/cave.jpg",
    settings: "24mm • f/11 • Sony A6700"
  },
  {
    id: 7,
    src: "/images/green.jpg",
    settings: "24mm • f/11 • Sony A6700"
  },
  {
    id: 8,
    src: "/images/dapper.jpg",
    settings: "70mm • f/5.6 • Sony A7III"
  },
];

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => (
  <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
    {/* Logo - Same for both mobile and desktop */}
    <div className="font-serif text-2xl tracking-tighter italic font-bold text-black">
      ma.
    </div>

    {/* Mobile Hamburger Menu */}
    <button
      onClick={onMenuClick}
      className="md:hidden text-black"
      aria-label="Open menu"
    >
      <Menu size={24} />
    </button>

    {/* Desktop Nav */}
    <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light text-black">
      <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
      <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
      <a href="mailto:mamin.create@gmail.com" className="hover:opacity-50 transition-opacity">Contact</a>
    </nav>
  </header>
);

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-0 z-[70] bg-[#FDFBF7] flex flex-col"
      >
        {/* Close Button */}
        <div className="px-6 py-6 flex justify-end">
          <button onClick={onClose} aria-label="Close menu">
            <X size={28} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-36 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] mb-6 text-gray-500"
          >
            Photography Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-6xl leading-none mb-2 tracking-tighter"
          >
            MO <span className="font-light text-gray-400">AMIN</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto text-sm font-light text-gray-600 mt-8 leading-relaxed mb-12"
          >
            Capturing moments of stillness in an ever-changing world.
            Specializing in street, portrait, and architectural photography.
          </motion.p>

          {/* Contact Link */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href="mailto:mamin.create@gmail.com"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-black transition-colors text-gray-600 border border-gray-300 px-6 py-3 rounded-full"
          >
            <Mail size={18} /> Contact Me
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

type ParallaxImageProps = {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
};

const ParallaxImage = ({ item, onClick }: ParallaxImageProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Subtle scale and opacity effects only (no parallax movement)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      className="group relative w-full h-[70vh] mb-24 overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <MotionImage
          style={{ scale, opacity }}
          src={item.src}
          alt="Portfolio image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
        />
      </div>

      {/* Overlay Details */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-center items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-t from-black/60 to-transparent">
        <div className="text-gray-200 font-sans text-xs tracking-wider">
          {item.settings}
        </div>
      </div>
    </motion.div>
  );
};

type MobileCarouselProps = {
  items: PortfolioItem[];
};

const MobileCarousel = ({ items }: MobileCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});

  const currentItem = items[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Preload adjacent images
  useEffect(() => {
    const preloadIndexes = [
      currentIndex,
      (currentIndex + 1) % items.length,
      currentIndex === 0 ? items.length - 1 : currentIndex - 1
    ];

    preloadIndexes.forEach((index) => {
      if (!imageLoaded[index]) {
        const img = new window.Image();
        img.src = items[index].src;
        img.onload = () => {
          setImageLoaded((prev) => ({ ...prev, [index]: true }));
        };
      }
    });
  }, [currentIndex, items, imageLoaded]);

  return (
    <div className="relative w-full flex flex-col">
      {/* Carousel Container */}
      <div className="relative w-full h-[70vh] overflow-hidden bg-gray-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {/* Loading state */}
            {!imageLoaded[currentIndex] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              </div>
            )}

            {/* Image */}
            <Image
              src={currentItem.src}
              alt="Portfolio image"
              fill
              sizes="100vw"
              className="object-cover"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Settings - Below Image */}
      <div className="flex justify-center py-4">
        <div className="text-gray-600 font-sans text-xs tracking-wider">
          {currentItem.settings}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 pb-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-gray-800'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

type MobileLightboxProps = {
  item: PortfolioItem | null;
  onClose: () => void;
};

const MobileLightbox = ({ item, onClose }: MobileLightboxProps) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors z-50"
        >
          <X size={28} strokeWidth={2} />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={item.src}
              alt="Portfolio image"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

type LightboxProps = {
  item: PortfolioItem | null;
  onClose: () => void;
};

const Lightbox = ({ item, onClose }: LightboxProps) => {
  // Lock scroll when lightbox is open
  useEffect(() => {
    if (item) {
      // Simply prevent scrolling without changing position
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scrolling
        document.body.style.overflow = '';
      };
    }
  }, [item]);

  // Listen for escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (item) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
        style={{ height: '100dvh' }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
        >
          <X size={32} strokeWidth={1} />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full flex items-center justify-center px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-6xl h-[85vh]">
            <Image
              src={item.src}
              alt="Portfolio image"
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


export default function Home() {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileMenuOpen]);

  // Load fonts dynamically and enable smooth scrolling
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Lato:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.head.removeChild(link);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      {/* Global Font Styles Override */}
      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
      `}</style>

      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <main>
        {/* Hero Section - Hidden on Mobile */}
        <section className="hidden md:flex h-screen flex-col items-center justify-center relative px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center z-10"
          >
            <motion.p
              className="text-xs md:text-sm uppercase tracking-[0.3em] mb-6 text-gray-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Photography Portfolio
            </motion.p>
            <motion.h1
              className="font-serif text-7xl md:text-9xl lg:text-[11rem] leading-none mb-2 tracking-tighter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              MO <span className="font-light text-gray-400">AMIN</span>
            </motion.h1>
            <motion.p
              className="max-w-md mx-auto text-sm md:text-base font-light text-gray-600 mt-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Capturing moments of stillness in an ever-changing world.
              Specializing in street, portrait, and architectural photography.
            </motion.p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll to gallery"
          >
            <ArrowDown className="text-gray-400" size={24} />
          </motion.button>
        </section>

        {/* Gallery Section */}
        <section id="work" className="px-4 md:px-12 pt-24 md:pt-20 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <MobileCarousel items={portfolioItems} />
            </div>

            {/* Desktop Grid */}
            <motion.div
              className="hidden md:grid md:grid-cols-12 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`${
                    // Simple masonry-like offset logic
                    index % 3 === 0 ? 'md:col-span-12' : 'md:col-span-6'
                    }`}
                  variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  {/* Adjust margins to create a staggered, non-grid feel for elegance */}
                  <div className={`${index % 2 !== 0 && index % 3 !== 0 ? 'md:mt-32' : ''}`}>
                    <ParallaxImage item={item} onClick={setSelectedImage} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About / Info Section */}
        <section id="about" className="py-32 px-6 bg-[#111] text-[#FDFBF7]">
          <motion.div
            className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div
              className="w-full md:w-1/3"
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
            >
              <h2 className="font-serif text-5xl italic mb-6">The Photographer</h2>
              <div className="w-12 h-0.5 bg-white/20"></div>
            </motion.div>
            <motion.div
              className="w-full md:w-2/3"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
            >
              <motion.p
                className="text-xl font-light leading-relaxed mb-8 text-gray-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.2 }
                  }
                }}
              >
                <span className="italic">"Look and think before opening the shutter. The heart and mind are the true lens of the camera."</span> — Yousuf Karsh
              </motion.p>
              <motion.p
                className="text-gray-400 font-light leading-relaxed mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.3 }
                  }
                }}
              >
                Hi I'm Mo and based in New York City, I'm a hobbiest who enjoys capturing moments of all sizes. Currently, I'm shooting on a Sony A7III on Sigma prime lenses.
              </motion.p>
              <motion.div
                className="flex gap-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.4 }
                  }
                }}
              >
                {/* <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white transition-colors text-gray-400">
                  <Instagram size={18} /> Instagram
                </button> */}
                <a
                  href="mailto:mamin.create@gmail.com"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white transition-colors text-gray-400"
                >
                  <Mail size={18} /> Email Me
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <motion.footer
          className="py-12 text-center text-gray-500 text-xs uppercase tracking-widest border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          &copy; {new Date().getFullYear()} Mo Amin Photography. All Rights Reserved.
        </motion.footer>
      </main>

      {/* Mobile or Desktop Lightbox */}
      {isMobile ? (
        <MobileLightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
      ) : (
        selectedImage && (
          <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
        )
      )}

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
