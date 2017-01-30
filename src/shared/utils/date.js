export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const isDateElement = el => MONTHS.indexOf(el) !== -1 || (el !== undefined && !isNaN(el.replace(/[,.;]/, '')));
