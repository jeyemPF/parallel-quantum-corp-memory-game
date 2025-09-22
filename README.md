# 🧠 React/TypeScript Memory Game

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.3-green?logo=vite)
![License](https://img.shields.io/badge/License-MIT-yellow)

A “Memory / Concentration” card-matching game built with **React**, **TypeScript**, and **SCSS Modules**.  
Designed as a **junior frontend candidate task** to demonstrate component design, state management, TypeScript hygiene, styling, accessibility, and UX polish.

---

## 🎯 Overview

- **Goal:** Match pairs of cards on a grid.
- **Tech stack:** React 18, TypeScript, SCSS Modules, Vite (or Next.js Pages Router)
- **Audience:** Junior-mid frontend developers
- **Estimated effort:** ~1 day (timebox if needed; incomplete is okay — explain trade-offs in README)

---

## 🕹 Features

### Core Requirements (MVP)

1. **Game Board**
   - Grid of face-down cards (default 4×4)
   - Flip exactly two cards per turn
   - Matching cards stay face-up; non-matching flip back after short delay
   - Cards **shuffled** at the start and on reset

2. **Game Controls**
   - Timer (starts on first flip, stops on last match)
   - Move counter (increments per pair of flips)
   - Restart button (reshuffles and resets state)

3. **Difficulty**
   - Selector with three levels: 2×2, 4×4, 6×6
   - Changes rebuild the board dynamically

4. **Responsive UI**
   - Fully responsive down to **320px mobile portrait**
   - Smooth scaling of cards and layout

5. **Styling**
   - SCSS Modules for component-scoped styles
   - Organized variables/mixins, minimal duplication
   - Subtle card flip animation using CSS transform

---

### Nice-to-Have (Stretch Goals)

- **Accessibility**
  - Fully playable with keyboard: Tab/Shift+Tab to focus, Enter/Space to flip cards
  - Proper ARIA semantics: `button`, `aria-pressed`, live regions for announcements
- **Best Score**
  - Tracks best moves per difficulty
  - Break ties by completion time
  - Stored in `localStorage`
- **Extra Features**
  - Emoji card themes 🐶🐱💻🖥️
  - Smooth flip animations and announcements
  - Dark/light mode (optional)

---

## 🎮 Demo / Gameplay

### Example Cards

| 🐶 | 🐱 | 💻 | 🖥️ |
|---|---|---|---|

> Flip two cards per turn, match all pairs to win. Timer and move counter track your progress.

---

## 🚀 Usage

```bash
# Clone repository
git clone https://github.com/<your-username>/memory-game.git
cd memory-game

# Install dependencies
npm install

# Start development server
npm run dev
