const rgb = array => `rgb(${array})`;
const white = rgb([250, 250, 250]);
const black = rgb([0, 0, 0]);
const red = rgb([208, 58, 69]);
const pink = rgb([251, 146, 145]);
const green = rgb([0, 151, 84]);
const grey = rgb([130, 130, 130]);
const yellow = rgb([255, 255, 100]);
const brown = rgb([186, 152, 101]);
const blue = rgb([50, 109, 255]);

const full = {
  bg: white,
  positive: green,
  negative: red,
  flat: grey,
  text: black,
  buttonText: white,
  buttonBg: black,
  buttonBorder: black,
  bars: black,
  selection: blue,
  pink
};

const blackAndWhite = {
  bg: white,
  positive: black,
  negative: black,
  flat: grey,
  text: black,
  buttonText: white,
  buttonBg: black,
  buttonBorder: black,
  bars: grey,
  selection: black,
  pink
};

const highContrast = {
  bg: black,
  positive: black,
  negative: black,
  flat: black,
  text: yellow,
  buttonText: yellow,
  buttonBg: black,
  buttonBorder: black,
  bars: yellow,
  selection: yellow,
  pink
};

const lowContrast = {
  bg: brown,
  positive: black,
  negative: black,
  flat: brown,
  text: black,
  buttonText: black,
  buttonBg: brown,
  buttonBorder: black,
  bars: black,
  selection: brown,
  pink
};

export default {
  full, blackAndWhite, highContrast, lowContrast, pink
};
