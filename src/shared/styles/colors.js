const rgb = array => `rgb(${array})`;
const white = [250, 250, 250];
const black = [0, 0, 0];
const red = [208, 58, 69];
const green = [0, 151, 84];
const grey = [204, 204, 204];
const yellow = [255, 255, 100];
const brown = [186, 152, 101];
const blue = [50, 109, 255];

const full = {
  bg: rgb(white),
  positive: rgb(green),
  negative: rgb(red),
  flat: rgb(grey),
  text: rgb(black),
  buttonText: rgb(white),
  buttonBg: rgb(black),
  buttonBorder: rgb(black),
  bars: rgb(black),
  selection: rgb(blue)
};

const blackAndWhite = {
  bg: rgb(white),
  positive: rgb(black),
  negative: rgb(black),
  flat: rgb(grey),
  text: rgb(black),
  buttonText: rgb(white),
  buttonBg: rgb(black),
  buttonBorder: rgb(black),
  bars: rgb(grey),
  selection: rgb(black)
};

const highContrast = {
  bg: rgb(black),
  positive: rgb(black),
  negative: rgb(black),
  flat: rgb(black),
  text: rgb(yellow),
  buttonText: rgb(yellow),
  buttonBg: rgb(black),
  buttonBorder: rgb(black),
  bars: rgb(yellow),
  selection: rgb(yellow)
};

const lowContrast = {
  bg: rgb(brown),
  positive: rgb(black),
  negative: rgb(black),
  flat: rgb(brown),
  text: rgb(black),
  buttonText: rgb(black),
  buttonBg: rgb(brown),
  buttonBorder: rgb(black),
  bars: rgb(black),
  selection: rgb(brown)
};

export default {
  full, blackAndWhite, highContrast, lowContrast
};
