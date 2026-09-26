# Ramesh Chicken Center — Official Website

A premium, responsive, multi-page static website for **Ramesh Chicken Center** (ரமேஷ் சிக்கன் சென்டர்), handcrafted using pure **HTML5, CSS3, and Vanilla JavaScript**. Designed faithfully based on the reference UI design (`HOME.pdf`).

---

## 📁 1. Project Structure

```
ramesh-chicken-center/
│
├── index.html              # Home page with Hero Carousel, Welcome narrative, Products, Features & Contact
├── about.html              # Dedicated About page with 2-part layout, brand story & "Why Choose Us"
├── service.html            # Dedicated Services page with 6 poultry cards & "Why Our Products" pillars
├── contact.html            # Dedicated Contact page with details, interactive validation form & Google Map
│
├── css/
│   └── style.css           # Primary stylesheet with custom properties, responsive breakpoints & animations
│
├── js/
│   └── script.js           # Vanilla JavaScript for carousel, mobile menu, form validation & scroll effects
│
└── assets/                 # High-resolution optimized local image assets
    ├── logo.png            # Transparent brand emblem (ரமேஷ் சிக்கன் சென்டர்)
    ├── hero-1.jpg          # Carousel Slide 1: Fresh Chicken
    ├── hero-2.jpg          # Carousel Slide 2: Skinless Chicken
    ├── hero-3.jpg          # Carousel Slide 3: Country Chicken
    ├── hero-4.jpg          # Carousel Slide 4: Assorted Poultry Products
    ├── welcome-badge.jpg   # Brand emblem badge for Welcome / About section
    ├── owner.jpg           # Portrait photo of founder/proprietor
    ├── broiler-chicken.jpg # Product 1: வெந்நீர் கறி (Broiler Chicken)
    ├── skinless-chicken.jpg# Product 2: தோல் நீக்கிய கறி (Skinless Chicken)
    ├── broiler-whole.jpg   # Product 3: பிராய்லர் கோழி (Whole Broiler)
    ├── country-chicken.jpg # Product 4: நாட்டுக்கோழி (Country Chicken)
    ├── quail.jpg           # Product 5: காடை (Quail)
    ├── chicken-eggs.jpg    # Product 6: நாட்டுக்கோழி முட்டை (Farm Fresh Eggs)
    ├── chicken-products.jpg# Assorted cuts & party order display
    └── map-preview.png     # Map preview thumbnail
```

---

## 🚀 2. How to Run the Website

Since this is a 100% static website without heavy framework dependencies, running it is simple:

### Option A: Open Directly in Browser
- Double-click `index.html` or right-click `index.html` and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Option B: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) if not already installed.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500/`.

### Option C: Using Built-in Python HTTP Server
Open your terminal inside the project directory and run:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🖼️ 3. Where and How to Replace Images

All image files are located in the `assets/` folder. To update an image, simply replace the file with a new file keeping the same name, or update the `src` attribute in the respective HTML file:

| Asset | Location in Website | Recommended Dimensions |
| :--- | :--- | :--- |
| `logo.png` | Header & Navigation | ~1400x500px transparent PNG |
| `hero-1.jpg` to `hero-4.jpg` | Home Page Carousel | 1920x1080px (16:9 ratio) |
| `owner.jpg` | Welcome / About Section | 600x600px (1:1 square) |
| `broiler-chicken.jpg` | Product Card 1 | 800x600px |
| `skinless-chicken.jpg` | Product Card 2 | 800x600px |
| `broiler-whole.jpg` | Product Card 3 | 800x600px |
| `country-chicken.jpg` | Product Card 4 | 800x600px |
| `quail.jpg` | Product Card 5 | 800x600px |
| `chicken-eggs.jpg` | Services Card 5 | 800x800px |

---

## 🏢 4. How to Change Business Information

Store details such as phone numbers, email, GST, and hours appear in the header/footer and on `index.html` and `contact.html`.

### To modify contact details:
1. Open `index.html` and `contact.html`.
2. Locate the `<div class="store-info-list">` section.
3. Edit the following text:
   - **Address**: `Sri Murugan Textiles Building, No.5, Chidambaram Road, Jayankondam - 621802`
   - **Phone**: `87540 50858` / `87460 80898` (also update `href="tel:..."`)
   - **Email**: `info@rameshchickencenter.in` (also update `href="mailto:..."`)
   - **GST**: `33AALFS7970C1Z1`
   - **Working Hours**: Update daily opening and closing times.

---

## 🎨 5. How to Change Colors

The website uses centralized CSS Custom Properties (Variables) inside [css/style.css](file:///c:/Users/Dhinesh/OneDrive/Desktop/Portfolio/css/style.css).

Open `css/style.css` and modify the `:root` block:

```css
:root {
  /* Page Lime Gradient (matching HOME.pdf) */
  --bg-gradient-start: #8ad957;
  --bg-gradient-end: #c7e164;
  --bg-gradient: linear-gradient(135deg, #8ad957 0%, #c7e164 100%);

  /* Primary Brand Greens */
  --primary-green: #1a4d1a;
  --dark-green: #0f2e10;
  --forest-green: #15381d;

  /* Accent Red / Burgundy */
  --accent-red: #882424;
  --accent-red-hover: #a12c2c;

  /* Feature / Statistics Card Tan (matching HOME.pdf) */
  --card-tan: #a28d7e;

  /* Contact & Form Card Cream */
  --card-cream: #fff8f2;
}
```

---

## 🔄 6. How to Modify Carousel Slides

The 4-slide hero carousel is located inside `index.html` within `<div class="carousel-track">`.

### Adding or Editing Slides:
Each slide is structured as:
```html
<article class="carousel-slide" aria-roledescription="slide" aria-label="Slide Title">
  <img src="assets/your-slide-image.jpg" alt="Description">
  <div class="carousel-caption">
    <span class="carousel-tag">Your Badge</span>
    <h2 class="carousel-title">Your Heading</h2>
    <p class="carousel-subtitle">Your Subtitle</p>
  </div>
</article>
```

### Auto-play Settings:
In [js/script.js](file:///c:/Users/Dhinesh/OneDrive/Desktop/Portfolio/js/script.js), adjust the slide duration:
```javascript
const autoPlayInterval = 4500; // Change duration in milliseconds (4.5s)
```
The carousel automatically:
- Pauses when the user hovers over it
- Resumes when the mouse leaves
- Supports touch swipe on mobile devices
- Supports left/right keyboard arrow keys
- Auto-syncs indicator dots

---

## 📱 7. Responsive Breakpoints

- **Desktop**: `1200px+` (5-column product layout, horizontal hero banner)
- **Tablet**: `768px – 1199px` (2 to 3-column product cards, stacked visual layout)
- **Mobile**: `< 768px` (Full-screen mobile drawer menu, single column cards, swipe-enabled carousel)

---

## 📜 8. Compliance & Accessibility

- **Semantic HTML5**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **ARIA Attributes**: `aria-expanded`, `aria-roledescription`, `aria-current`, `role="tab"`
- **Client-Side Validation**: Immediate feedback on name, phone, email, and message inputs
- **Tamil Typography**: Custom font support for clean rendering of Tamil Unicode characters
