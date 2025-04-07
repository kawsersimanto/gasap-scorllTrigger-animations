# ✨ Scroll Animation Utilities

This project contains a JavaScript-based animation utility using [GSAP](https://gsap.com/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [SplitType](https://github.com/lukePeavey/SplitType), and [Lenis](https://github.com/studio-freight/lenis). It enables beautiful scroll-based animations, including text line reveals, fade-ins, scale effects, and element translations in both the X and Y axes.

## 🔗 CDN Scripts Used

```html
<script src="https://unpkg.com/split-type@0.3.4/umd/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.37/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"></script>
```
# 🧠 Features
## 1. Text Line Animation
Adds line-by-line animation to elements with data-text-line:

html
Copy
Edit
<div data-text-line>Animated Heading</div>
Animates each line upward with a power4 easing.

Uses SplitType for splitting the text into lines.

Triggered by scroll using ScrollTrigger.

## 2. Fade-In from Left
Fade-in from left for elements with data-fade="left" and child elements marked with data-fade-child.

html
Copy
Edit
<div data-fade="left" data-fade-value="150">
  <div data-fade-child>Fade Me In</div>
</div>
data-fade-value: X offset (default: 100)

data-fade-trigger: Optional selector for ScrollTrigger trigger element

## 3. Scale from Left
html
Copy
Edit
<div data-scale="left" data-scale-value="0.8" data-scale-duration="0.6">
  <div data-scale-child>Scale Me</div>
</div>
Animates from a smaller scale to normal.

data-scale-child required inside.

Staggered animation using ScrollTrigger.

## 4. Scale Up
html
Copy
Edit
<div data-scale="up" data-scale-value="0.8" data-scale-duration="0.5"></div>
Simple scale-up animation on scroll.

No opacity or stagger by default.

Triggered via data-scale-trigger if needed.

## 5. Horizontal Movement
Move To X:

html
Copy
Edit
<div data-move-to="100"></div>
Move From X:

html
Copy
Edit
<div data-move-from="-100"></div>
Move To Y:

html
Copy
Edit
<div data-move-to-y="50"></div>
Move From Y:

html
Copy
Edit
<div data-move-from-y="-50"></div>
Smooth xPercent or yPercent movement with scroll.

Supports data-move-trigger for custom trigger element.

scrub: 1 ensures smooth, scroll-linked animation.

## 6. Slide Up Animation
html
Copy
Edit
<div data-slide="up" data-slide-value="-10"></div>
Slides an element upward on scroll.

data-slide-trigger for custom triggering.

# 🛠 How to Use
Add the CDN scripts listed above in your HTML.

Add the corresponding data-* attributes to your HTML elements.

No manual initialization is required — all scripts auto-detect elements with the correct attributes.

# 📦 Customization
Each data attribute supports optional configuration:

Attribute	Description	Default
data-fade-value	Offset in X direction	100
data-fade-trigger	Custom scroll trigger selector	self
data-scale-value	Initial scale value	0.8
data-scale-duration	Duration of scale animation (in seconds)	0.5
data-move-to / from	Target position in X (%)	- / + value
data-move-to-y / from-y	Target position in Y (%)	- / + value
data-slide-value	Vertical slide offset	-10

# 📋 Example
html
Copy
Edit
<section data-fade="left" data-fade-value="150">
  <div data-fade-child>Scroll me in from left</div>
</section>

<h2 data-text-line>This is a Heading</h2>

<div data-scale="up" data-scale-value="0.7" data-scale-duration="0.6"></div>

# 📁 File Structure
This README assumes the animation logic is embedded in your main HTML or bundled in a script file like animations.js.

# ✅ Dependencies
- GSAP v3.12.7
- GSAP ScrollTrigger
- SplitType
- Lenis Smooth Scroll (Optional)

#🧾 License
This project uses open-source libraries and can be freely modified or integrated.

# 🙌 Credits
GSAP

Studio Freight (Lenis)

Luke Peavey (SplitType)
