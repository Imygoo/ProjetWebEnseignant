module.exports = {
  content: [
    './src/**/*.html',
    "./src/**/*.{html,ts,component,style,scss,css,less,sass}",
  ],
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
