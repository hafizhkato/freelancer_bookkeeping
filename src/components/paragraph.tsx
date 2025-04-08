import React from "react";

type ParagraphProps = {
  text: string;
};

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  return (
    <div className="text-left py-4 ml-4 font-poppins">
      <p className="text-base text-gray-800">{text}</p>
    </div>
  );
};

export default Paragraph;
