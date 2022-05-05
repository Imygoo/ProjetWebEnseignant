module.exports = {
  content: [
    './src/**/*.html',
    "./src/**/*.{html,ts,component,style,scss,css,less,sass}",
  ],
  purge: [
    './src/**/*.html',
    "./src/**/*.{html,ts,component,style,scss,css,less,sass}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // auto refresh
  devServer: {
    liveReload: true,
  },
}
