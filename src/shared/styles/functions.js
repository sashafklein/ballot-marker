export default {
  setRGBOpacity: (rgb, opacity) => {
    const regex = /rgb[a]*\(([\d|\s|,]+)\)/g;
    const match = regex.exec(rgb);
    const numberString = match[1].split(',').slice(0, 3);
    return `rgba(${numberString}, ${opacity})`;
  },
};
