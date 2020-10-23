export const isArabic = (text) => {
  const pattern = /[\u0600-\u06FF]/;
  return pattern.test(text);
};
