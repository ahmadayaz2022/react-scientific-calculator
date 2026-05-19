# React Scientific Calculator

Professional, responsive scientific calculator built with React.

This project provides a modern, mobile-first calculator supporting basic arithmetic and a set of scientific functions (trigonometry in degrees, powers, roots), memory operations, and a persistent calculation history. It is styled for both light and dark preferences and aims for accessibility and responsive behavior across devices.

**Live demo:** Run locally using the instructions below.

**Highlights:**
- Basic operations: +, −, ×, ÷, decimals
- Scientific functions: `sin()`, `cos()`, `tan()` (degrees), `sqrt()`, `log`, `ln`, `%`, factorial
- Powers: square (`x²`), cube (`x³`), and exponent (`xⁿ`)
- Memory: `M+`, `MR`, `MC`, `M-`
- Calculation history with quick recall
- Keyboard support and mobile-friendly layout

---

## Getting Started

These instructions will help you run the project locally for development and testing.

### Prerequisites

- Node.js (v14+ recommended)
- npm (v6+)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ahmadayaz2022/react-scientific-calculator.git
cd react-scientific-calculator
npm install
```

Start the development server:

```bash
npm start
```

Open http://localhost:3000 in your browser.

---

## Usage

- Click buttons or use the keyboard to type numbers and operators.
- Press `=` or Enter to evaluate the expression.
- Use `C` to clear, `⌫` to backspace, and the history panel to recall previous results.
- Toggle between degrees and radians using the `DEG`/`RAD` button (application defaults to degrees).

### Keyboard Shortcuts

- Numbers: `0`–`9`
- Decimal: `.`
- Basic operators: `+`, `-`, `*`, `/`
- Parentheses: `(`, `)`
- Evaluate: `Enter` or `=`
- Clear: `Escape`
- Backspace: `Backspace`

---

## Examples

- `2 + 3` → `5`
- `sin(90)` → `1` (when in degrees)
- `pi^2` → `9.869604401089358`
- `sqrt(16) + 2^3` → `12`

---

## Project Structure

- `public/` — static HTML
- `src/` — React source files (`App.js`, `App.css`, `index.js`)
- `package.json` — project metadata and scripts

---

## Contributing

Contributions are welcome. If you'd like to propose changes, please open an issue or submit a pull request describing the improvement.

---

## License

This repository does not include a license file. If you intend to publish or share this project, consider adding an appropriate open source license (for example, MIT).

---

## Author

Ahmad Ayaz — Software Developer / React Enthusiast

- Email: ahmadayaz2022@gmail.com
- LinkedIn: https://www.linkedin.com/in/ahmadayaz99

If you want, I can also add a CONTRIBUTING guide or a LICENSE file.
