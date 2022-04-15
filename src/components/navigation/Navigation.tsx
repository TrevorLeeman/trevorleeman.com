import Link from "next/link";
import React from "react";

type NavigationItem = {
  label: string;
  href: string;
  target?: "_blank";
};

const navigationList: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Portfolio",
    href: "/#portfolio",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const NavigationItem = ({ navItem }: { navItem: NavigationItem }) => {
  return (
    <li>
      <Link href={navItem.href}>
        <a target={navItem.target} className="py-4 px-5">
          {navItem.label}
        </a>
      </Link>
    </li>
  );
};

export const Navigation = () => {
  const navigationItems = navigationList.map((navItem, index) => (
    <NavigationItem key={index} navItem={navItem} />
  ));

  return (
    <nav>
      <ol className="list-none flex flex-nowrap gap-4">{navigationItems}</ol>
    </nav>
  );
};
