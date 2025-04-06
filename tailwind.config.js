import typography from '@tailwindcss/typography';

export default config = {
    content: [
        "./src/**/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}", 
        "./src/app/*.{js,ts,jsx,tsx}", 
        "./src/components/*.{js,ts,jsx,tsx}", 
        "./components/**/*.{js,ts,jsx,tsx}", 
        "./src/components/*.{js,ts,jsx,tsx}",
        "./components/*.{js,ts,jsx,tsx}",,
        "./app/*.{js,ts,jsx,tsx}",
        "./app/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    
    plugins: [typography],
};