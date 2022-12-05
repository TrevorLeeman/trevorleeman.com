import Link from 'next/link';
import React from 'react';

type NavigationItem = {
  label: string;
  href: string;
  target?: '_blank';
};

const navigationList: NavigationItem[] = [
  // {
  //   label: 'Home',
  //   href: '/',
  // },
  {
    label: 'Projects',
    href: '/#projects',
  },
];

const NavigationItem = ({ navItem }: { navItem: NavigationItem }) => {
  return (
    <li className="font-abel text-xl font-medium hover:text-theme-purple dark:hover:text-theme-pink sm:text-3xl">
      <Link href={navItem.href} target={navItem.target} scroll={false} className="py-2 px-3">
        {navItem.label}
      </Link>
    </li>
  );
};

const Navigation = () => {
  return (
    <nav>
      <ol className="mr-6 flex list-none flex-nowrap gap-6 sm:mr-12 sm:gap-12">
        {navigationList.map((navItem, index) => (
          <NavigationItem key={index} navItem={navItem} />
        ))}
      </ol>
    </nav>
  );
};

export default Navigation;
