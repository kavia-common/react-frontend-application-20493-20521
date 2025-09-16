/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#F59E0B",
        success: "#10B981",
        error: "#EF4444",
        background: "#f9fafb",
        surface: "#ffffff",
        text: "#111827"
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "14px"
      }
    }
  },
  plugins: []
};
