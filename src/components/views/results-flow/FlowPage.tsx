import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Wraps one page of the results flow in a 240ms slide-in/out (a fade only when the OS asks for reduced motion).
 * Changing `key` on the parent (page + nutrient index) triggers the transition and remounts the page,
 * which also resets any per-page local state (e.g. the supplement accordion).
 */
export const FlowPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduce = useReducedMotion();
  const shift = reduce ? 0 : 20;
  return (
    <motion.div
      initial={{ opacity: 0, x: shift }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -shift }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="flex-1 flex flex-col justify-between"
    >
      {children}
    </motion.div>
  );
};
