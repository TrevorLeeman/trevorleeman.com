import Navigation from "../navigation/Navigation";
import ThemeToggle from "../theme/themeToggle/ThemeToggle";

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="py-8 px-10 flex justify-center">
      <div className="w-full max-w-screen-xl justify-end flex items-center">
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
