import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 w-screen absolute left-0 top-0">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2, // Staggered effect
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
