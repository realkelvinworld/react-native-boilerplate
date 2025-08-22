// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["BricolageGrotesque_400Regular"],
        "bricolage-bold": ["BricolageGrotesque_700Bold"],
        "bricolage-extrabold": ["BricolageGrotesque_800ExtraBold"],
        "space-mono": ["SpaceMono"],
        // Geist
        geist: ["Geist_400Regular"],
        "geist-bold": ["Geist_700Bold"],
        "geist-medium": ["Geist_500Medium"],
        "geist-semibold": ["Geist_600SemiBold"],
        "geist-extrabold": ["Geist_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
