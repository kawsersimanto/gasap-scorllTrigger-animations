# ✨ Scroll Animation Utilities

This project contains a JavaScript-based animation utility using [GSAP](https://gsap.com/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [SplitType](https://github.com/lukePeavey/SplitType), and [Lenis](https://github.com/studio-freight/lenis). It enables beautiful scroll-based animations, including text line reveals, fade-ins, scale effects, and element translations in both the X and Y axes.

## Features
- Smooth scrolling with Lenis
- Navbar activation on scroll
- Text line animations with SplitType and GSAP
- Fade-in animations (from left)
- Scale animations (scale up or from left)
- Move animations (horizontal and vertical)
- Slide-up animations

## 🔗 CDN Scripts Used

```html
<script src="https://unpkg.com/split-type@0.3.4/umd/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.37/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/kawsersimanto/gasap-scorllTrigger-animations@main/app.js"></script>
```
## JS Code

```js

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
    navbar.classList.toggle("active", scrollY > 200);
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


```

## Navbar Activation on Scroll

The script automatically toggles an .active class on the element with .main-header class after scrolling 200px.

```html
<header class="main-header">
  <!-- Navbar content -->
</header>
```

## Usage
```html

<div data-animate="slide-down" data-duration="1.5" data-stagger="0.3">
  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
</div>

```


# Attributes Summary

| Attribute               | Purpose                                                            |
|--------------------------|-------------------------------------------------------------------|
| `data-animate`         | The type of animation preset. (fade-left,  text-line, move-from, move-to, slide-down, slide-up, scale-up, scale-left, fade-left)                                       |
| `data-value`         | Movement or scale value.                                              |
| `data-x, data-y`         | For move-to or move-from animations.                              |
| `data-child`         | Selector for child elements to animate.                               |
| `data-blur`         | Apply blur effect.                                                     |
| `data-delay`         |  Initial delay before animation starts.                               |
| `data-stagger`         | Stagger delay between multiple child elements.                      |
| `data-duration`         |  Duration of the animation.                                        |
| `data-ease`         | Easing function for the animation.                                     |
| `data-toggle-actions`         | Defines animation lifecycle (play, pause, resume, reset).    |
| `data-start`         | Start position for the scroll trigger.                                |
| `data-scrub`         | Enable/disable scrubbing.                                             |
| `data-trigger`         | Custom scroll trigger element.                                      |


## Notes

- All scroll animations are triggered using GSAP ScrollTrigger.
- Smooth scrolling is handled automatically using Lenis.
- This setup provides a lightweight and highly customizable scroll animation experience without heavy page builders.
