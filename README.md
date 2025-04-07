# gasap-scorllTrigger-animations

# ✨ GSAP Scroll Animations
This script adds scroll-triggered animations to your HTML elements using GSAP and SplitType. It allows you to easily create smooth text animations, fade-ins, scale effects, and movement animations with customizable attributes.

# 📦 Requirements
- GSAP
- ScrollTrigger plugin
- SplitType (for line-based text animation)

# ✨ Text Line Scroll Animation with GSAP & SplitType

Animate lines of text as they scroll into view using **GSAP** and **SplitType**. This animation splits text into lines and animates them upward with a smooth staggered motion.

---

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
Copy
Edit
<h2 data-text-line>
  This text will animate line by line as it scrolls into view.
</h2>
```

# 💻 JavaScript Code
```js
Copy
Edit
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
