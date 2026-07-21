import { motion } from "framer-motion";
const PageTransition = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.main>
);
export default PageTransition;
