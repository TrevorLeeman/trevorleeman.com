import { motion } from 'framer-motion';
import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import React, { ReactNode } from 'react';

const SocialLink = ({ href, label, children }: { href: string; label: string; children: ReactNode }) => (
  <motion.a
    href={href}
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    className="inline-block w-9 3xs:w-10 sm:w-11 lg:w-14"
  >
    {children}
  </motion.a>
);

const Socials = () => (
  <ul className="flex gap-3 md:gap-4 lg:gap-6">
    <li>
      <SocialLink href="https://www.linkedin.com/in/trevor-leeman/" label="LinkedIn">
        <LinkedinLogo size={'100%'} />
      </SocialLink>
    </li>
    <li>
      <SocialLink href="https://www.github.com/TrevorLeeman" label="Github">
        <GithubLogo size={'100%'} />
      </SocialLink>
    </li>
  </ul>
);

export default Socials;
