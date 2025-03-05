import Link from "next/link";
import NavLink from "./navLink";

export default function NavBar() {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/#cover">
            <img src="/logo-tengoku-game.webp" className="logo max-w-[5.8rem] h-auto cursor-pointer"></img>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/#cover">Inicio</NavLink>
            <NavLink href="/#juego">Juego</NavLink>
            <NavLink href="/#faq">FAQ</NavLink>
            <NavLink href="/about-us">Sobre Nosotros</NavLink>
            <NavLink href="/#contacto">Contacto</NavLink>
          </nav>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    )
  }