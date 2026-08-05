import React, { PropsWithChildren } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import BullMarket from '../fun/BullMarket';

const Layout = ({ children }: PropsWithChildren) => (
  <div className="flex w-full grow flex-col">
    <a
      href="#main"
      className="sr-only rounded-lg border border-accent bg-surface px-4 py-2 font-mono text-xs uppercase tracking-label text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" tabIndex={-1} className="flex-grow outline-none">
      {children}
    </main>
    <Footer />
    <BullMarket />
  </div>
);

export default Layout;
