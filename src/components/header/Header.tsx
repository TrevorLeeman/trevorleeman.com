import { Navigation } from "../navigation";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="py-8 px-10">
      <Navigation />
    </header>
  );
};
