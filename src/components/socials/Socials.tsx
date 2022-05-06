import { motion } from "framer-motion";
import { GithubLogo, LinkedinLogo } from "phosphor-react";
import React, { ReactNode } from "react";

const SocialLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ scale: 1.1 }}
    className="inline-block w-8 md:w-10"
  >
    {children}
  </motion.a>
);

const Socials = () => (
  <ul className="flex gap-3">
    <li>
      <SocialLink href="https://www.linkedin.com/in/trevor-leeman/">
        <LinkedinLogo size={"100%"} />
      </SocialLink>
    </li>
    <li>
      <SocialLink href="https://www.github.com/TrevorLeeman">
        <GithubLogo size={"100%"} />
      </SocialLink>
    </li>
  </ul>
);
export default Socials;
