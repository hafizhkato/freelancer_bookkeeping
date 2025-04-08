import React from "react";

type BulletPointProps = {
  items: string[];
};

const BulletPoint: React.FC<BulletPointProps> = ({ items }) => {
  return (
    <div className="text-left py-4 ml-4 font-poppins">
      <ul className="list-disc list-inside text-base text-gray-800">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default BulletPoint;
