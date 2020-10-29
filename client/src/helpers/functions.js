export const isArabic = (text) => {
  const pattern = /[\u0600-\u06FF]/;
  return pattern.test(text);
};

export const validateEmail = (email) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

export const validateForm = (errors) =>
  Object.values(errors).some((value) => Boolean(value));
