const { styleHelpers } = require("@rivet-gg/components");

const safelistMap = [
  ["m(x|y|l|r|t|b)", styleHelpers.MARGIN_VALUES],
  ["m", styleHelpers.MARGIN_VALUES],
  ["p", styleHelpers.PADDING_VALUES],
  ["p(x|y|l|r|t|b)", styleHelpers.PADDING_VALUES],
  ["gap", styleHelpers.GAP_VALUES],
  ["flex", styleHelpers.FLEX_DIRECTION_VALUES],
  ["justify", styleHelpers.JUSTIFY_CONTENT_VALUES],
  ["items", styleHelpers.ALIGN_ITEMS_VALUES],
  ["grid-cols", styleHelpers.GRID_COLUMNS_VALUES],
  ["w", styleHelpers.WIDTH_VALUES],
  ["flex", styleHelpers.FLEX_VALUES],
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Restricting the content to the components folder
  // forces developers to use ui components for styling instead of utility classes
  content: [
    "./src/**/components/**/*.{ts,tsx}",
    "./src/layouts/**/*.{ts,tsx}",
    "./src/forms/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "../../node_modules/@rivet-gg/components/**/*.{ts,tsx}",
  ],
  prefix: "",
  safelist: safelistMap.map(([pattern, values]) => ({
    pattern: new RegExp(`${pattern}-(${values.join("|")})`),
    variants: ["xl", "lg", "md", "sm"],
  })),
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    data: {
      active: 'status~="active"',
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};