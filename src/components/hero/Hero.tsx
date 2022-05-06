import React from "react";

const Hero: React.FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen bg-enchantmentsGoatHero bg-cover bg-no-repeat bg-center relative">
      {children}
    </div>
  );
};

export default Hero;
