export const parseBoolean = (value, defaultValue) => {
  let ret = defaultValue;
  if (typeof value === 'boolean') {
    ret = value;
  } else if (typeof value === 'string') {
    ret =
      value.toLowerCase() === 'true' ||
      value.toLowerCase() === 'yes' ||
      value.toLowerCase() === 'x' ||
      value.toLowerCase() === '1';
  } else if (typeof value === 'number') {
    ret = value !== 0;
  } else if (typeof value === 'object') {
    ret = true;
  }

  return ret;
};

export const parseIntNumber = (text) => {
  const currentVal = parseInt(text, 10);
  return Number.isNaN(currentVal) ? undefined : currentVal;
};

export const parseFloatNumber = (text) => {
  const currentVal = parseFloat(text);
  return Number.isNaN(currentVal) ? undefined : currentVal;
};

export const toBase64 = (text) => Buffer.from(String(text)).toString('base64');
export const fromBase64 = (base64) => Buffer.from(base64, 'base64').toString();

export default { parseBoolean, toBase64, parseIntNumber };
