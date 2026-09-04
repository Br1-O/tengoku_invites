"use client";

import Link from "next/link";
import { handleInnerLinks } from "@/lib/navigation/innerLinks";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
}

export default function NavLink({ href, children, onClick, target }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-white hover:text-[#ff0080] transition-colors duration-300 nav-link"
      onClick={(e) => handleInnerLinks(e, href, onClick)}
      {...(target ? { target, rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}