// src/components/cards/AdminCard.tsx
import React from "react";

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-[#131b2e]/80 border border-[#1e293b] rounded-xl p-6 shadow-xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
};