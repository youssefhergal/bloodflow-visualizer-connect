# BloodLink: Interactive Blood Type Compatibility Visualizer

BloodLink is an interactive web application that lets users explore blood type compatibility through beautiful animations.  
Select a blood type (like A+, O-, etc.), and watch as animated figures and flowing tubes visually show who you can donate to or receive blood from.  
The goal is to make understanding blood compatibility easy, educational, and fun.

---

## 🚀 Features

- **Blood Type Selector**: Choose any blood type to see compatibility.
- **Animated Visualization**:  
  - Person figures represent different blood types.
  - Dynamic blood flow animation between compatible donors and recipients.
- **Donation and Reception Modes**:  
  - Toggle to see "Who can I donate to?" or "Who can I receive from?".
- **Smooth Transitions**:  
  - Animated connections appear and fade smoothly when switching types.
- **Mobile Responsive**:  
  - Optimized for desktop, tablet, and mobile views.

---

## 🎨 Technologies Used

- **Frontend Framework**: React.js (or Vue.js)
- **Animations**: GSAP / anime.js / SVG / Canvas
- **Styling**: TailwindCSS
- **Deployment**: Vercel or Netlify (Static Hosting)

---

## 🩸 Blood Compatibility Logic

The app follows real-world transfusion compatibility based on blood type and Rh factor (+/-).  
For example:
- **A+ can donate to** A+ and AB+
- **O- can donate to** anyone (universal donor)
- **AB+ can receive from** anyone (universal recipient)

See the [Compatibility Table](#) for full details inside the app.

---

## 📂 Project Structure

```bash
/src
  /components
  /hooks
    - bloodCompatibility.js
  /lib
    - images, icons
  /pages
    - tailwind.css
  /utils
  App.css
  App.tsx
  main.tsx
/public


