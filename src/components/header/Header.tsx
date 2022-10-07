// import Navigation from "../navigation/Navigation";
import ThemeToggle from '../theme/ThemeToggle';

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="flex max-w-screen-xl justify-center py-8 px-10">
      <div className="flex w-full max-w-screen-xl items-center justify-end">
        {/* <Navigation /> */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
