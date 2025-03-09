import React from "react";

interface IconTitleDescriptionCardProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  border?: "red" | "blue";
  shadow?: boolean;
}

const IconTitleDescriptionCard: React.FC<IconTitleDescriptionCardProps> = ({ icon: Icon, title, description, border, shadow }) => {
  const borderColor = border === "blue" ? "border-[#00ffff]/30" : border === "red" ? "border-[#ff0080]/30" : "";
  const shadowColor = border === "blue" ? "hover:shadow-[2px_2px_10px_#00ffff]" : border === "red" ? "hover:shadow-[2px_2px_10px_#ff0080]" : "";

  return (
    <div
      className={`min-h-full min-w-full relative flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm px-5 py-2 rounded-xl hover:scale-105 transition-transform duration-300 border ${borderColor} ${shadow ? shadowColor : ""}`}
    >
      {Icon && <Icon className="h-10 w-10 text-[#ff0080]" />}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 text-[#00ffff]">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default IconTitleDescriptionCard;