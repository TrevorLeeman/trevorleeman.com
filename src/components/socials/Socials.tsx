import { GithubLogo, LinkedinLogo } from "phosphor-react";
import React from "react";

const Socials = () => (
  <ul className="flex gap-3">
    <li>
      <a
        href="https://www.linkedin.com/in/trevor-leeman/"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedinLogo size={40} />
      </a>
    </li>
    <li>
      <a
        href="https://www.github.com/TrevorLeeman"
        target="_blank"
        rel="noreferrer"
      >
        <GithubLogo size={40} className="cursor-pointer" />
      </a>
    </li>
  </ul>
);
export default Socials;
