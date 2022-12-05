import { motion, Variants } from 'framer-motion';
import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import React, { ReactNode } from 'react';

const socialsWrapperVariants: Variants = {
  hidden: { transition: {} },
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
};

const socialsItemVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5 } },
};

export const Socials = () => (
  <motion.ul variants={socialsWrapperVariants} initial="hidden" animate="show" className="flex gap-3 md:gap-4 lg:gap-6">
    <motion.li variants={socialsItemVariants}>
      <SocialLink href="https://www.linkedin.com/in/trevor-leeman/" label="LinkedIn">
        <LinkedinLogo size={'100%'} />
      </SocialLink>
    </motion.li>
    <motion.li variants={socialsItemVariants}>
      <SocialLink href="https://www.github.com/TrevorLeeman" label="Github">
        <GithubLogo size={'100%'} />
      </SocialLink>
    </motion.li>
  </motion.ul>
);

const SocialLink = ({ href, label, children }: { href: string; label: string; children: ReactNode }) => (
  <motion.a
    href={href}
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    className="inline-block w-9 hover:text-theme-purple dark:hover:text-theme-pink 3xs:w-10 sm:w-11 lg:w-14"
  >
    {children}
  </motion.a>
);
