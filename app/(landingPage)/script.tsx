"use client"

import { useEffect } from "react"

export default function ClientScript() {
  useEffect(() => {
    // Navbar scroll effect
    const navbar = document.getElementById("navbar")
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled")
      } else {
        navbar?.classList.remove("scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Animation for game cards on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const gameCards = document.querySelectorAll(".game-card")
    gameCards.forEach((card) => {
      observer.observe(card)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      gameCards.forEach((card) => {
        observer.unobserve(card)
      })
    }
  }, [])

  return null
}