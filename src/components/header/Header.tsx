import Navigation from './Navigation';
import ThemeToggle from '../theme/ThemeToggle';

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="flex justify-center py-8 px-10">
      <div className="flex w-full items-center justify-end">
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
