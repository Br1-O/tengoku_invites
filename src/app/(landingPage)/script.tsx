"use client"

import { useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

export default function ClientScript() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to("#navbar", {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Example: Darker navbar on scroll
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#navbar",
        start: "top top",
        toggleActions: "play none none reverse",
      },
    })

    // Logo fade-in animation
    gsap.to("#navbar-logo", {
      opacity: 1, 
      y: 0, // Moves up into position
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#navbar",
        start: "top top",
        toggleActions: "play none none reverse",
      },
    })
    
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll("#navbar a")

    // ScrollTrigger to update the active class for each navbar link
    sections.forEach((section) => {
      const isFooter = section.id === "contacto"; // Identify if the section is the footer

      ScrollTrigger.create({
        trigger: section,
        start: isFooter ? "top 85%" : "top 65%", // For the footer, trigger when top reaches 85% of viewport
        end: isFooter ? "bottom 40%" : "bottom 35%", // For the footer, end when the bottom reaches 40%
        toggleActions: "play none none reverse",
        onEnter: () => setActive(section.id),
        onEnterBack: () => setActive(section.id),
        onLeave: () => removeActive(section.id),
        onLeaveBack: () => removeActive(section.id),
        onUpdate: ({ direction }) => {
          if (direction === -1 && section.id !== "contacto") {
            // Check if scrolling upwards, and if we're not in the footer
            setActive(section.id);
          }
        },
      });
    });

    // Function to set the active link in the navbar
    function setActive(id: string) {
      if (window.innerWidth >= 768) { // Apply only on md+ screens
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    }

    // Function to remove the active class from the link
    function removeActive(id: string) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.remove("active");
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()) // Cleanup GSAP triggers
    }
  }, [])

  return null
}


    // Animation for game cards on scroll
    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         entry.target.classList.add("visible")
    //       }
    //     })
    //   },
    //   { threshold: 0.1 },
    // )

    // const gameCards = document.querySelectorAll(".game-card")
    // gameCards.forEach((card) => {
    //   observer.observe(card)
    // })

    // return () => {
    //   window.removeEventListener("scroll", handleScroll)
    //   gameCards.forEach((card) => {
    //     observer.unobserve(card)
    //   })
    // }