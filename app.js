document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.3,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenis.on("scroll", ScrollTrigger.update);

  // Navbar active class on scroll
  const navbar = document.querySelector(".main-header");
  document.addEventListener("scroll", () => {
    navbar?.classList.toggle("active", scrollY > 200);
  });

  // Animation presets
  const animationPresets = {
    "fade-left": (el) => ({
      x: parseInt(el.getAttribute("data-value") || 100),
      opacity: 0,
    }),
    "scale-left": (el) => ({
      scale: parseFloat(el.getAttribute("data-value") || 0.8),
      opacity: 0,
    }),
    "scale-up": (el) => ({
      scale: parseFloat(el.getAttribute("data-value") || 0.8),
    }),
    "slide-up": (el) => ({
      yPercent: parseFloat(el.getAttribute("data-value") || -10),
    }),
    "slide-down": (el) => ({
      yPercent: parseFloat(el.getAttribute("data-value") || -10),
      opacity: 0,
    }),
    "move-to": (el) => ({
      xPercent: parseFloat(el.getAttribute("data-x") || 0),
      yPercent: parseFloat(el.getAttribute("data-y") || 0),
    }),
    "move-from": (el) => ({
      xPercent: parseFloat(el.getAttribute("data-x") || 0),
      yPercent: parseFloat(el.getAttribute("data-y") || 0),
    }),
    "text-line": (el) => {
      const textLines = new SplitType(el, { types: "lines" });
      textLines.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("line-wrap");
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
      return { yPercent: 100 };
    },
  };

  // Generic animation function
  function animateElement(element) {
    const type = element.getAttribute("data-animate");
    const preset = animationPresets[type];

    if (!preset) return;

    const trigger = element.getAttribute("data-trigger") || element;
    const scrub = element.getAttribute("data-scrub") === "true";
    const start = element.getAttribute("data-start") || "top 80%";
    const toggleActions =
      element.getAttribute("data-toggle-actions") || "play none none reverse";
    const ease = element.getAttribute("data-ease") || "power3.out";
    const duration = parseFloat(element.getAttribute("data-duration") || 1);
    const stagger = parseFloat(element.getAttribute("data-stagger") || 0.3);
    const delay = parseFloat(element.getAttribute("data-delay") || 0);
    const blur = element.getAttribute("data-blur") || 0;
    const childSelector = element.getAttribute("data-child");

    const animationProps = {
      ease,
      duration,
      stagger,
      delay,
      blur: `${blur}px`,
      ...preset(element),
    };

    gsap.from(
      childSelector ? element.querySelectorAll(childSelector) : element,
      {
        ...animationProps,
        scrollTrigger: {
          trigger,
          start,
          toggleActions,
          scrub,
        },
      }
    );
  }

  // Animate all elements with [data-animate]
  document.querySelectorAll("[data-animate]").forEach(animateElement);
});
