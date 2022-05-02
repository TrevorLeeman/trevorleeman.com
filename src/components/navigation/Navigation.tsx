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
        <a target={navItem.target} className="py-2 px-3">
          {navItem.label}
        </a>
      </Link>
    </li>
  );
};

const Navigation = () => {
  const navigationItems = navigationList.map((navItem, index) => (
    <NavigationItem key={index} navItem={navItem} />
  ));

  return (
    <nav className="inline-block">
      <ol className="list-none flex flex-nowrap gap-3">{navigationItems}</ol>
    </nav>
  );
};

export default Navigation;
