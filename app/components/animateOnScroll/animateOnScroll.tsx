import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animationName?:
    | "fadeIn"
    | "fadeOut"
    | "enterFromLeft"
    | "enterFromRight"
    | "enterFromUp"
    | "enterFromDown"
    | "scaleUp"
    | "scaleDown"
    | "spinX"
    | "spinY"
    | "spinZ"
    | "bounce"
    | "elastic"
    | "back";
  duration?: number;
  delay?: number;
  ease?:
    | "power2.out"
    | "elastic.out"
    | "bounce.out"
    | "back.out"
    | "linear"
    | "power4.out";
  className?: string;
  start?: string;
  toggleActions?: string
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className = '',
  animationName = "fadeIn",
  duration = 1,
  delay = 0,
  ease = "power2.out",
  start = "top 75%",
  toggleActions = "play none none reset"
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Ensure immediate setting of initial state
    gsap.set(elementRef.current, { opacity: 0 });

    // Select animation based on the animationName prop
    switch (animationName) {
      case "fadeIn":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "fadeOut":
        gsap.fromTo(
          elementRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "enterFromLeft":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, x: -200 },
          {
            opacity: 1,
            x: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "enterFromRight":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, x: 200 },
          {
            opacity: 1,
            x: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "enterFromUp":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "enterFromDown":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "scaleUp":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "scaleDown":
        gsap.fromTo(
          elementRef.current,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "spinX":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, rotationX: 180 },
          {
            opacity: 1,
            rotationX: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "spinY":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, rotationY: 180 },
          {
            opacity: 1,
            rotationY: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "spinZ":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, rotationZ: 180 },
          {
            opacity: 1,
            rotationZ: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "bounce":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, y: -100 },
          {
            opacity: 1,
            y: 0,
            ease: "bounce.out",
            duration,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "elastic":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            ease: "elastic.out(1, 0.75)",
            duration,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      case "back":
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, x: -200 },
          {
            opacity: 1,
            x: 0,
            ease: "back.out(1.7)",
            duration,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;

      default:
        gsap.fromTo(
          elementRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              toggleActions: toggleActions,
            },
          }
        );
        break;
    }

    return () => {
      // Cleanup scroll trigger on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animationName, duration, delay, ease]);

  return (
    <div ref={elementRef} className={`${className} animate-on-scroll`}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;