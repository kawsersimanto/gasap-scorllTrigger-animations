# ✨ GSAP Scroll Animations
This script adds scroll-triggered animations to your HTML elements using GSAP and SplitType. It allows you to easily create smooth text animations, fade-ins, scale effects, and movement animations with customizable attributes.

# 📦 Requirements
- GSAP
- ScrollTrigger plugin
- SplitType (for line-based text animation)

# ✨ Text Line Scroll Animation with GSAP & SplitType

Animate lines of text as they scroll into view using **GSAP** and **SplitType**. This animation splits text into lines and animates them upward with a smooth staggered motion.

## 📦 Installation

### Using CDN (Recommended for Quick Setup)

```html
<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- SplitType -->
<script src="https://unpkg.com/split-type"></script>
```
# 🧩 HTML Structure
Add data-text-line to any element you want to animate:

```html
<h2 data-text-line>
  This text will animate line by line as it scrolls into view.
</h2>
```

# 💻 JavaScript Code
```js

// text line animation
document.querySelectorAll("[data-text-line]").forEach((element) => {
  const textLines = new SplitType(element, { types: "lines" });

  textLines.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("line-wrap");
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.from(textLines.lines, {
    scrollTrigger: {
      trigger: element,
      toggleActions: "play none none reverse",
    },
    yPercent: 100,
    ease: "power4",
    duration: 0.7,
    stagger: 0.1,
  });
});
```
# 🪄 Styling Tip

Add this basic CSS to improve line separation:

```css
.line-wrap {
  overflow: hidden;
  display: block;
}
```
# 👈 Fade-in Animation (Right to Left) with GSAP & ScrollTrigger
Create smooth fade-in animations from right to left for elements as they scroll into view using **GSAP** and `ScrollTrigger`.

🧩 HTML Structure
Use the following structure:

```html
<section data-fade="left" data-fade-value="150" data-fade-trigger="#custom-trigger">
  <div data-fade-child>Child element 1</div>
  <div data-fade-child>Child element 2</div>
  <div data-fade-child>Child element 3</div>
</section>

<!-- Or simply use: -->
<section data-fade="left">
  <div data-fade-child>Fade me in</div>
</section>
```

# 💻 JavaScript Code
```js

// Fade-in animation from right to left for elements with data-fade="left"
document.querySelectorAll('[data-fade="left"]').forEach((element) => {
  const fadeValue = element.getAttribute("data-fade-value") || 100; // Default to 100 if not set
  const triggerSelector = element.getAttribute("data-fade-trigger") || element;

  gsap.from(element.querySelectorAll("[data-fade-child]"), {
    x: parseInt(fadeValue), // Convert to number
    opacity: 0,
    ease: "power3.out",
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: triggerSelector,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});
```
