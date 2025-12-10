"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Create a motion-wrapped Image component
const MotionImage = motion(Image);
import { X, ArrowDown, Instagram, Mail } from 'lucide-react';

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
    src: "/images/abstract.jpg",
    settings: "35mm • f/4 • Sony A6700"
  },
  {
    id: 5,
    src: "/images/museum.jpg",
    settings: "50mm • f/2 • Sony A6700"
  },
  {
    id: 6,
    src: "/images/kiddo.jpg",
    settings: "70mm • f/5.6 • Sony A7III"
  },
  {
    id: 7,
    src: "/images/orange.jpg",
    settings: "35mm • f/2.8 • Sony A6700"
  },
  {
    id: 8,
    src: "/images/cave.jpg",
    settings: "24mm • f/11 • Sony A6700"
  },
  {
    id: 9,
    src: "/images/balloon.jpg",
    settings: "50mm • f/4 • Sony A6700"
  },
  {
    id: 10,
    src: "/images/kiddo2.jpg",
    settings: "85mm • f/1.8 • Sony A7III"
  }
];

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
    <div className="font-serif text-2xl tracking-tighter italic font-bold">
      ma.
    </div>
    <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light">
      <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
      <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
      <a href="mailto:mamin.create@gmail.com" className="hover:opacity-50 transition-opacity">Contact</a>
    </nav>
  </header>
);

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
      className="group relative w-full h-[80vh] mb-24 overflow-hidden cursor-pointer"
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
  onImageClick: (item: PortfolioItem) => void;
};

const MobileCarousel = ({ items, onImageClick }: MobileCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < items.length) {
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center mb-20">
      {/* Carousel Container */}
      <div className="relative w-full h-[75vh] overflow-hidden mb-8">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <div
              className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
              onClick={() => onImageClick(items[currentIndex])}
            >
              <Image
                src={items[currentIndex].src}
                alt="Portfolio image"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none flex justify-center">
                <p className="text-white text-xs tracking-wider">{items[currentIndex].settings}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicators - Only on Image */}
        {currentIndex > 0 && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        )}
        {currentIndex < items.length - 1 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        )}
      </div>

      {/* Navigation Dots - Below Image */}
      <div className="flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-gray-800 w-8' : 'bg-gray-400 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
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

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      <Header />

      <main>
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
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
              mo <span className="font-light text-gray-400">amin</span>
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ArrowDown className="text-gray-400" size={24} />
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section id="work" className="px-4 md:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <MobileCarousel items={portfolioItems} onImageClick={setSelectedImage} />
            </div>

            {/* Desktop Grid */}
            <motion.div
              className="hidden md:grid grid-cols-12 gap-6"
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
                    index % 3 === 0 ? 'col-span-12' : 'col-span-6'
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
                  {/* Adjust margins to create a staggered, non-grid feel
                      for elegance
                   */}
                  <div className={`${index % 2 !== 0 && index % 3 !== 0 ? 'mt-32' : ''}`}>
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
                Based in New York City, I'm a hobbiest who enjoys capturing moments of all sizes. Currently, I'm shooting with the Sony A7III.
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
    </div>
  );
}
