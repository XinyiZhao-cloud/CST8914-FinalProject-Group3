# Empower Ability Labs – Accessible SPA

## 📌 Project Overview
This project is a single-page application (SPA) designed to promote accessibility awareness and inclusive digital experiences. It follows **WCAG 2.1 AA** guidelines and demonstrates accessible design and interaction patterns.

---

## 🚀 Features

### 1. Navigation (SPA)
- Implemented hash-based routing (`#home`, `#services`, `#schedule`)
- Only one view is visible at a time
- `aria-current="page"` used for active navigation
- Focus moves to page heading after navigation

---

### 2. Layout Design & Accessibility
- Responsive layout using Bootstrap
- Improved color contrast to meet WCAG 2.1 AA
- Clear visual focus indicators for keyboard users
- Accessible typography and spacing

---

### 3. Lightbox / Modal (Accessible Dialog)
- Custom modal implemented **without Bootstrap JavaScript**
- Uses:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby` and `aria-describedby`
- Accessibility features:
  - Focus moves into modal when opened
  - Focus is trapped inside modal
  - Escape key closes modal
  - Focus returns to triggering element

📖 Reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

---

### 4. Switch Component (ARIA)
- Implemented custom switch using:
  - `role="switch"`
  - `aria-checked`
- Supports:
  - Mouse interaction
  - Keyboard (Enter, Space)
- Visual ON/OFF state provided

📖 Reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/switch/

---

### 5. Conditional Form Field (Show/Hide)
- “Tell us about your event” field:
  - Hidden by default
  - Appears only when “Invite a speaker” is selected
- Improves usability by reducing unnecessary input

---

### 6. Web Form
- Includes:
  - Business Name
  - Phone Number
  - Email (**required**)
  - Topic selection (radio buttons)
- Uses semantic HTML and labels for accessibility
- Provides feedback messages:
  - Success message
  - Error message

---

## ♿ Accessibility (WCAG 2.1 AA)

The project ensures:
- Keyboard accessibility for all interactive elements
- Proper use of ARIA roles and attributes
- Sufficient color contrast
- Visible focus indicators
- Logical focus order and navigation

---

## ⚙️ Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap (CSS only)

---

## 🛠️ Testing and Debugging:
- Keyboard (Tab, Enter, Space, Esc)
- WAVE Evaluation Tool
- Accessibility Insights for Web
- Browser DevTools Lighthouse
- Screen Reader: VoiceOver (macOS) and NVDA (Windows)

---

## ⚠️ Challenges & Solutions

### Challenge 1: Modal without Bootstrap JavaScript
- Needed to implement modal behavior manually

**Solution:**
- Managed focus manually
- Added keyboard support (Tab, Escape)
- Controlled visibility using JavaScript

---

### Challenge 2: Keyboard Accessibility
- Ensuring all components work without a mouse

**Solution:**
- Added keyboard event listeners (Tab, Enter, Space)
- Implemented focus management

---

### Challenge 3: Dynamic Form Behavior
- Showing/hiding fields based on user selection

**Solution:**
- Used event listeners on radio inputs
- Controlled visibility dynamically

---

## 📂 Project Structure
```
/project-root
│── EmpowerAbilityLab.html
│── EmpowerAbilityLab.css
│── EmpowerAbilityLab.js
│── /images
```

### Distribution: 
Person 1: Yiming He
- [x] Focus management
- [x] Unique page titles
- [x] Browser Back button sync
- [x] Navigation bar

Person 2: Xinyi Zhao
- [x] Lightbox/Modal
- [x] Switch
- [x] Show/Hide form (“Tell us about your event”)

Person 3: Sara Mirzaeipouynak
- [x] Web form accessibility and semantics
- [x] Error validation
- [x] User notifications (thank you/errors)

Person 4: Bosi Chen
- [x] Responsive layout
- [x] User-friendly design and colour contrast
- [x] HTML semantics: page structure, content, and headings

### Workflow:
Person 4 (Structure + Layout)  
        ↓  
Person 1 (SPA + Navigation)  
        ↓  
Person 2 (Interactive UI)  
        ↓  
Person 3 (Form Logic)  

--- 

### AI Assistance Disclosure
This project used ChatGPT as a supportive tool for generating formatting suggestions, improving code structure, and assisting with accessibility implementation. All final decisions, code integration, and validation were completed by the project team.
