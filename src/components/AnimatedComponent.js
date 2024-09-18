// AnimatedComponent.js
import { motion } from "framer-motion";

export const AnimatedComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger the child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid-container"  // Add the grid layout class
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="grid-item" variants={itemVariants}>
          <h3>Item {i + 1}</h3>
        </motion.div>
      ))}
    </motion.div>
  );
};