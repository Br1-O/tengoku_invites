"use client";

import { usePathname } from "next/navigation";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noNavbarFooterRoutes = ["/general", "/inv", "/registered", "/register-error"];
    const isHidden = noNavbarFooterRoutes.includes(pathname) || noNavbarFooterRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {!isHidden && <NavBar />}
      {children}
      {!isHidden && <Footer />}
    </>
  );
}
