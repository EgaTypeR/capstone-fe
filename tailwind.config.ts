import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        fablue: {
          light: '#374F6B',    
          DEFAULT: '#374F6B',  
          dark: '#374F6B',     
        },
        fagray: {
          light: '#54637A',    
          DEFAULT: '#54637A',  
          dark: '#54637A',     
        },
        falightgray: {
          light: '#D9D9D9',    
          DEFAULT: '#D9D9D9',  
          dark: '#D9D9D9', 
        },
        fatomato: {
          light:"#E65757",
          DEFAULT:"#E65757",
          dark:"#E65757",
        },
        faorange: {
          light:"#E69357",
          DEFAULT:"#E69357",
          dark:"#E69357",
        },
      },
    },
  },
  plugins: [],
};
export default config;
    