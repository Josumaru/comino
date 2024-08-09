/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#ebfef4',
          '100': '#cefde2',
          '200': '#a1f9cb',
          '300': '#65f0b2',
          '400': '#28df92',
          '500': '#03d383',
          '600': '#00a164',
          '700': '#008154',
          '800': '#006644',
          '900': '#00543a',
          '950': '#002f21',
        }
      },
      fontFamily: {
        black: ["Lexend-Black"],
        bold: ["Lexend-Bold"],
        extrabold: ["Lexend-ExtraBold"],
        extralight: ["Lexend-ExtraLight"],
        light: ["Lexend-Light"],
        medium: ["Lexend-Medium"],
        regular: ["Lexend-Regular"],
        semibold: ["Lexend-SemiBold"],
        thin: ["Lexend-Thin"],
      }
    },
  },
  plugins: [],
}