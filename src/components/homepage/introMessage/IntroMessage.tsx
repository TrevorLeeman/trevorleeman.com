import { motion, Variants } from 'framer-motion';

const introMessageVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', duration: 1 } },
};

const IntroMessage = () => (
  <motion.h1
    variants={introMessageVariants}
    initial="hidden"
    animate="show"
    className="flex flex-col pb-7 font-abel sm:pb-8 lg:pb-9"
  >
    <span className="text-2xl sm:text-4xl lg:text-5xl">Hi, my name is</span>
    <span>
      <span className="font-default text-7xl font-bold text-theme-purple dark:text-theme-pink 3xs:text-8xl sm:text-[9.5rem] lg:text-[11.5rem] ">
        Trevor
      </span>
      <span className="text-lg sm:text-2xl lg:text-4xl"> and</span>
    </span>
    <span className="text-2xl font-semibold 3xs:text-3xl sm:text-5xl lg:text-6xl">I'M A SOFTWARE ENGINEER</span>
  </motion.h1>
);

export default IntroMessage;
