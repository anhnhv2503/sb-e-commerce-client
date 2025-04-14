import { motion } from "framer-motion";

const LovingVietnameToast = ({ t }) => {
  const handleRandomFact = () => {
    return "Tôi yêu Việt Nam";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`max-w-md w-full bg-gray-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {/* Vietnam Flag */}
            <div className="w-12 h-8 bg-red-600 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 512 512">
                  <polygon
                    points="256,96 307,204 422,204 329,272 364,384 256,320 148,384 183,272 90,204 205,204"
                    fill="#ffff00"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Yêu Thương Việt Nam
            </p>
            <p className="mt-1 text-sm text-gray-500">{handleRandomFact()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LovingVietnameToast;
