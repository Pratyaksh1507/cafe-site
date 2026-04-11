'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Common elegant minimal transition configurations.
 */
const elegantTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // easeOutQuint for a smooth snap-into-place feel
};

/**
 * A container that staggers its children automatically.
 * Use this to wrap a group of <FadeIn> elements.
 */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A sleek minimal fade-up element. Will automatically be staggered if placed
 * inside a <StaggerContainer>. Otherwise, define `delay` directly.
 */
export function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
}) {
  const shouldReduceMotion = useReducedMotion();

  let y = 0;
  let x = 0;

  if (!shouldReduceMotion) {
    if (direction === 'up') y = distance;
    if (direction === 'down') y = -distance;
    if (direction === 'left') x = distance;
    if (direction === 'right') x = -distance;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ ...elegantTransition, delay: shouldReduceMotion ? 0 : delay }}
      variants={{
        hidden: { opacity: 0, y, x },
        visible: { opacity: 1, y: 0, x: 0, transition: elegantTransition },
      }}
    >
      {children}
    </motion.div>
  );
}
