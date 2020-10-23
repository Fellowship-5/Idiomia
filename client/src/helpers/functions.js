export const isArabic = (text) => {
  const pattern = /[\u0600-\u06FF]/;
  const result = pattern.test(text);
  return result;
};
