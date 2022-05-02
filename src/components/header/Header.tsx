import Navigation from "../navigation/Navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="py-8 px-10 flex items-center">
      <Navigation />
      <ThemeToggle />
    </header>
  );
};

export default Header;
