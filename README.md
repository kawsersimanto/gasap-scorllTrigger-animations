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

  let lenis;

  lenis = new Lenis({
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

  // navbar
  const navbar = document.querySelector(".main-header");

  document.addEventListener("scroll", () => {
    if (scrollY > 200) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }
  });

  // text line animation

  document.querySelectorAll("[data-text-line]").forEach((element) => {
    const textLines = new SplitType(element, { types: "lines" });
    const triggerSelector =
      element.getAttribute("data-fade-trigger") || element;
    const duration = element.getAttribute("data-text-duration") || 0.7;
    const stagger = element.getAttribute("data-text-stagger") || 0.7;

    // adding wrapper to the line
    textLines.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrap");
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(textLines.lines, {
      scrollTrigger: {
        trigger: triggerSelector,
        toggleActions: "play none none reverse",
      },
      yPercent: 100,
      ease: "power4",
      duration: duration,
      stagger: stagger,
    });
  });

  // Fade-in animation from right to left for elements with moving
  document.querySelectorAll('[data-fade="left"]').forEach((element) => {
    const fadeValue = element.getAttribute("data-fade-value") || 100;
    const triggerSelector =
      element.getAttribute("data-fade-trigger") || element;
    const duration = element.getAttribute("data-fade-duration") || 1;
    const stagger = element.getAttribute("data-fade-stagger") || 0.3;
    const scrub = element.getAttribute("data-fade-scrub") || false;

    gsap.from(element.querySelectorAll("[data-fade-child]"), {
      x: parseInt(fadeValue),
      opacity: 0,
      ease: "power3.out",
      duration: duration,
      stagger: stagger,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 80%",
        toggleActions: "play none none reverse",
        scrub: scrub,
      },
    });
  });

  // element scale left animation
  document.querySelectorAll('[data-scale="left"]').forEach((element) => {
    const scaleValue = element.getAttribute("data-scale-value") || 0.8; // Default to 100 if not set
    const triggerSelector =
      element.getAttribute("data-scale-trigger") || element;
    const scaleDuration = element.getAttribute("data-scale-duration") || 0.5;

    gsap.from(element.querySelectorAll("[data-scale-child]"), {
      scale: scaleValue,
      opacity: 0,
      ease: "power3.out",
      duration: scaleDuration,
      stagger: 0.1,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // element scale up animation without opacity

  document.querySelectorAll('[data-scale="up"]').forEach((element) => {
    const scaleValue = element.getAttribute("data-scale-value") || 0.8; // Default to 100 if not set
    const triggerSelector =
      element.getAttribute("data-scale-trigger") || element;
    const scaleDuration = element.getAttribute("data-scale-duration") || 0.5;

    gsap.from(element, {
      scale: scaleValue,
      ease: "power3.out",
      duration: scaleDuration,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 80%",
        toggleActions: "play none none reverse",
        scrub: 1,
      },
    });
  });

  // element move animation

  document.querySelectorAll("[data-move-to]").forEach((trigger) => {
    const target = trigger.dataset.moveTrigger || trigger;
    const moveTo = trigger.dataset.moveTo;

    if (target) {
      gsap.to(trigger, {
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
        xPercent: `${moveTo}`,
        ease: "power1.out",
        duration: 0.3,
      });
    }
  });

  document.querySelectorAll("[data-move-from]").forEach((trigger) => {
    const target = trigger.dataset.moveTrigger || trigger;
    const moveFrom = trigger.dataset.moveFrom;

    if (target) {
      gsap.from(trigger, {
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
        xPercent: moveFrom,
        ease: "power1.out",
      });
    }
  });

  document.querySelectorAll("[data-move-to-y]").forEach((trigger) => {
    const target = trigger.dataset.moveTrigger || trigger;
    const moveToY = trigger.dataset.moveToY;

    if (target) {
      gsap.to(trigger, {
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
        yPercent: moveToY,
        ease: "power1.out",
      });
    }
  });

  document.querySelectorAll("[data-move-from-y]").forEach((trigger) => {
    const target = trigger.dataset.moveTrigger || trigger;
    const moveFromY = trigger.dataset.moveFromY;

    if (target) {
      gsap.from(trigger, {
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
        yPercent: moveFromY,
        ease: "power1.out",
      });
    }
  });

  document.querySelectorAll("[data-slide='up']").forEach((trigger) => {
    const target = trigger.dataset.slideTrigger || trigger;
    const slideValue = trigger.dataset.slideValue || -10;

    if (target) {
      gsap.from(trigger, {
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        yPercent: slideValue,
        ease: "power1.out",
      });
    }
  });
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
