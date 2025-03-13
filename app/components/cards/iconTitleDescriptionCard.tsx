import React from "react";

interface IconTitleDescriptionCardProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  border?: "red" | "blue";
  shadow?: boolean;
  className?: string;
  cornerContent?: string;
  corner?: "top-right" | "bottom-right" | "bottom-left" | "top-left" | "top-center" | "bottom-center" | "center-right" | "center-left";
}

const IconTitleDescriptionCard: React.FC<IconTitleDescriptionCardProps> = ({
  icon: Icon,
  title,
  description,
  border,
  shadow,
  className,
  cornerContent,
  corner,
}) => {
  const borderColor = border === "blue" ? "border-[#00ffff]/30" : border === "red" ? "border-[#ff0080]/30" : "";
  const hoverColor = border === "blue" ? "group-hover:bg-[#00ffff]/90" : border === "red" ? "group-hover:bg-[#ff0080]/90" : "";
  const shadowColor = border === "blue" ? "hover:shadow-[2px_2px_10px_#00ffff]" : border === "red" ? "hover:shadow-[2px_2px_10px_#ff0080]" : "";
  const textColor = border === "blue" ? "text-[#ff0080]" : border === "red" ? "text-[#00ffff]" : "";
  
  const cornerPositions: Record<string, string> = {
    "top-right": "top-[-1rem] right-[-1rem]",
    "bottom-right": "bottom-[-1rem] right-[-1rem]",
    "bottom-left": "bottom-[-1rem] left-[-1rem]",
    "top-left": "top-[-1rem] left-[-1rem]",
    "top-center": "top-[-1rem] left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-[-1rem] left-1/2 -translate-x-1/2",
    "center-right": "top-1/2 right-[-1rem] -translate-y-1/2",
    "center-left": "top-1/2 left-[-1rem] -translate-y-1/2",
  };

  return (
    <div
      className={`group whitespace-pre-line min-h-52 md:min-h-full min-w-full relative flex flex-col justify-center items-center bg-black/70 hover:bg-black/85 backdrop-blur-sm px-5 py-3 sm:py-1 md:py-4 rounded-xl lg:hover:scale-105 lg:transition-transform lg:duration-300 border ${borderColor} ${shadow ? shadowColor : ""} ${className || ""}`}
    >
      {Icon && <Icon className="h-10 w-10 text-[#ff0080]" />}
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-2 text-[#00ffff]`}>{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300">{description}</p>
      </div>
      {cornerContent && corner && (
        <div className={`absolute ${cornerPositions[corner]} text-2xl font-bold ${textColor} ${hoverColor} border ${borderColor} rounded-full bg-black/90 py-1 px-3.5`}>
          <span className="align-middle">{cornerContent}</span>
        </div>
      )}
    </div>
  );
};

export default IconTitleDescriptionCard;
