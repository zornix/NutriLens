import React from 'react';
import { motion } from 'motion/react';

/**
 * Wraps one page of the results flow in a 240ms slide-in/out.
 * Changing `key` on the parent (page + nutrient index) triggers the transition and remounts the page,
 * which also resets any per-page local state (e.g. the supplement accordion).
 */
export const FlowPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.24, ease: 'easeOut' }}
    className="flex-1 flex flex-col justify-between"
  >
    {children}
  </motion.div>
);
