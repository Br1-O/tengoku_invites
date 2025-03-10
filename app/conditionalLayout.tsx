"use client";

import { usePathname } from "next/navigation";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noNavbarFooterRoutes = ["/general", "/inv", "/registered", "/register-error", "/terms", "/about-us", "/privacy-policy", "/disclaimer"];
    const noFooterRouters = ["/none"];
    const isAllHidden = noNavbarFooterRoutes.includes(pathname) || noNavbarFooterRoutes.some(route => pathname.startsWith(route));
    const isFooterHidden = noFooterRouters.includes(pathname) || noFooterRouters.some(route => pathname.startsWith(route));
  return (
    <>
      {!isAllHidden && <NavBar />}
      {children}
      {(!isAllHidden && !isFooterHidden) && <Footer />}
    </>
  );
}
