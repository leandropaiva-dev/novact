"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Transição de entrada entre rotas (assinatura de movimento do site). O App
 * Router remonta o template a cada navegação, por isso um fade + slide subtil no
 * mount cobre a mudança de página sem o padrão frágil de AnimatePresence/exit.
 * data-reveal + o <noscript>/@media(scripting:none) garantem visibilidade sem JS.
 * Respeita prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
