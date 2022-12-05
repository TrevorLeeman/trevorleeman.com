import Navigation from './Navigation';
import ThemeToggle from '../theme/ThemeToggle';
import { motion, Variants } from 'framer-motion';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: '-100%' },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, delay: 0.8, duration: 0.8 } },
};

const Header = () => {
  return (
    <motion.header variants={headerVariants} initial="hidden" animate="show" className="flex justify-center py-8 px-10">
      <div className="flex w-full items-center justify-end">
        <Navigation />
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;
