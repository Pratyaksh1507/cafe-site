'use client';

import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
