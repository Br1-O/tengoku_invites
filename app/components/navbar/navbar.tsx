import Link from "next/link";
import NavLink from "./navLink";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu open/close
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 group" id="navbar">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link href="#home">
          <Image
            src="/logo-tengoku-game.webp"
            id="navbar-logo"
            className="logo object-contain max-w-[5.8rem] h-auto opacity-0 group-[.scrolled]:opacity-100"
            alt="logo Tengoku Game"
            layout="responsive"
            width={1}
            height={1}
          />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#home">Inicio</NavLink>
          <NavLink href="#novedades">Novedades</NavLink>
          <NavLink href="#participar">¿Cómo participo?</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#contacto">Contacto</NavLink>
          <NavLink href="/about-us" target="_blank">Sobre Nosotros</NavLink>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu} // Toggle menu on click
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-black/80 absolute w-max top-15 right-0 z-40 py-5 px-10`}
      >
        <nav className="flex flex-col justify-around items-right space-y-6">
          <NavLink href="#home" onClick={toggleMenu}>Inicio</NavLink>
          <NavLink href="#novedades" onClick={toggleMenu}>Novedades</NavLink>
          <NavLink href="#participar" onClick={toggleMenu}>¿Cómo partipo?</NavLink>
          <NavLink href="#faq" onClick={toggleMenu}>FAQ</NavLink>
          <NavLink href="#contacto" onClick={toggleMenu}>Contacto</NavLink>
          <NavLink href="/about-us" onClick={toggleMenu} target="_blank">Sobre Nosotros</NavLink>
        </nav>
      </div>
    </header>
  );
}