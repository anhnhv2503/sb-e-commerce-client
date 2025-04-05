import React, { useEffect, useState } from "react";
import appLogo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const AppLoading = () => {
  const [width, setWidth] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");
  const [particles, setParticles] = useState([]);

  // Generate random particles for background effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 4,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Progress bar logic
  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevWidth + 5;
      });
    }, 100);

    // Update loading text with dots animation
    const textInterval = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === "Loading...") return "Loading";
        return prevText + ".";
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 to-indigo-900 flex justify-center items-center z-50 overflow-hidden"
      >
        {/* Animated background particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20"
            initial={{
              x: `${particle.x}vw`,
              y: `${particle.y}vh`,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}

        <div className="flex flex-col items-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="mb-8 relative"
          >
            <motion.img
              src={appLogo}
              alt="logo"
              className="w-32 h-auto"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Glow effect behind logo */}
            <div className="absolute -inset-4 bg-indigo-500 opacity-20 rounded-full blur-xl -z-10"></div>
          </motion.div>

          <div className="w-full max-w-md relative mb-8">
            {/* Outer container with shadow */}
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm p-[1px]">
              {/* Gradient progress bar */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #c084fc, #818cf8, #38bdf8)",
                  boxShadow: "0 0 15px rgba(192, 132, 252, 0.7)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Pulse effect around progress bar */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(192, 132, 252, 0)",
                  "0 0 0 4px rgba(192, 132, 252, 0.3)",
                  "0 0 0 0 rgba(192, 132, 252, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-sm font-medium tracking-wider"
          >
            {loadingText}
          </motion.p>

          {/* When progress nears completion, show a hint */}
          <AnimatePresence>
            {width > 80 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-gray-300 text-xs mt-2 font-light"
              >
                Almost there...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppLoading;
