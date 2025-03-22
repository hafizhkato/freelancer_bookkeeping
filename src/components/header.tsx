import React from "react";


type HeaderProps = {
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {

  return (
    <div className="text-left py-6 ml-4 font-poppins">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}

    </div>
  );
};

export default Header;