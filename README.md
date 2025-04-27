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

## Text Line Animation
To animate text lines:

```html
<h2 data-text-line data-text-duration="0.7" data-text-stagger="0.5">
  Your Animated Text
</h2>
```

- `data-text-duration`: Animation duration per line (default: 0.7)
- `data-text-stagger`: Time between each line animation (default: 0.7)

## Fade Animation (Left)
To fade elements from the left:

```html
<div data-fade="left" data-fade-value="100" data-fade-duration="1" data-fade-stagger="0.3">
  <div data-fade-child>Item 1</div>
  <div data-fade-child>Item 2</div>
</div>
```
- `data-fade-value`: Distance to move horizontally (default: 100)
- `data-fade-duration`: Animation duration (default: 1)
- `data-fade-stagger`: Time between items (default: 0.3)
- `data-fade-scrub`: Set to true for smooth scroll-linked animations (optional)

## Scale Animations
Scale from Left

```html
<div data-scale="left" data-scale-value="0.8" data-scale-duration="0.5">
  <div data-scale-child>Content</div>
</div>
```

- `data-scale-value`: Scaling amount (optional default value: 0.8)
- `data-scale-duration`: Animation duration (default: 0.5)
- `data-scale-child`: Targeted Child Element

Scale Up (Single Element)

```html
<div data-scale="up" data-scale-value="0.8" data-scale-duration="0.5">
  Single Element
</div>
```

- `data-scale-value`: Scaling amount (optional default value: 0.8)
- `data-scale-duration`: Animation duration (default: 0.5)

## Move Animations
Move To (X Axis)

```html
<div data-move-to="50">Move Me Right</div>
```
- `data-move-to`: Move to X% relative to its own width.

Move From (X Axis)

```html
<div data-move-from="-50">Move Me from Left</div>
```

- `data-move-from`: Start from X% relative to its own width.

Move To (Y Axis)

```html
<div data-move-to-y="50">Move Me Down</div>
```

- `data-move-to-y`: Move to Y% relative to its own height.

Move From (Y Axis)

```html
<div data-move-from-y="-50">Move Me from Top</div>
```

- `data-move-from-y`: Start from Y% relative to its own height.

## Slide Up Animation

```html
<div data-slide="up" data-slide-value="-10">
  Slide Me Up
</div>
```

- `data-slide-value`: How much to move on Y axis (default: -10)



# Attributes Summary

| Attribute               | Purpose                              | Default |
|--------------------------|--------------------------------------|---------|
| `data-text-line`         | Animate text lines                   | —       |
| `data-text-duration`     | Duration of line animation           | 0.7     |
| `data-text-stagger`      | Delay between lines                  | 0.7     |
| `data-fade`              | Fade from left                       | —       |
| `data-fade-value`        | Distance to fade from                | 100     |
| `data-fade-duration`     | Duration of fade animation           | 1       |
| `data-fade-stagger`      | Delay between fade children          | 0.3     |
| `data-fade-scrub`        | Scroll scrub (true/false)            | false   |
| `data-scale`             | Scale animation direction (left/up)  | —       |
| `data-scale-value`       | Scale starting value                 | 0.8     |
| `data-scale-duration`    | Scale animation duration             | 0.5     |
| `data-move-to`           | Move X-axis to %                     | —       |
| `data-move-from`         | Move X-axis from %                   | —       |
| `data-move-to-y`         | Move Y-axis to %                     | —       |
| `data-move-from-y`       | Move Y-axis from %                   | —       |
| `data-slide`             | Slide direction (currently `up`)     | —       |
| `data-slide-value`       | Slide Y movement %                   | -10     |

## Notes

- All scroll animations are triggered using GSAP ScrollTrigger.
- Smooth scrolling is handled automatically using Lenis.
- This setup provides a lightweight and highly customizable scroll animation experience without heavy page builders.
