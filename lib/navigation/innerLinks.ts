export const handleInnerLinks = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onClickCallback?: () => void
) => {
  const isAnchor = href.startsWith("#") || href.startsWith("/#");

  if (isAnchor) {
    // Si estamos en la página principal, aplicamos el scroll
    if (window.location.pathname === "/") {
      e.preventDefault();

      // Remueve /# o # para obtener solo el id de la sección
      const targetId = href.replace(/^\/#?/, "").replace("#", "");
      const elem = document.getElementById(targetId);

      if (elem) {
        const navbarHeight = document.getElementById("navbar")?.offsetHeight || 80;
        const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }

  if (onClickCallback) {
    onClickCallback();
  }
};