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
    <li className="font-dosis text-xl font-medium hover:text-theme-purple">
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
    <nav>
      <ol className="list-none flex flex-nowrap gap-5 mr-5">
        {navigationItems}
      </ol>
    </nav>
  );
};

export default Navigation;
