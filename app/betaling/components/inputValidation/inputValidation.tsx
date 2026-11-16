export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 8;
};

export const formatPostalCode = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 4);
};

export const isValidPostalCode = (value: string) => {
  return /^\d{4}$/.test(value);
};

export const isValidPhone = (value: string) => {
  return /^\d{8}$/.test(value);
};

export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);

  return digits.replace(/(.{4})/g, "$1 ").trim();
};

export const isValidCardNumber = (value: string) => {
  const digits = value.replace(/\s/g, "");

  return /^\d{16}$/.test(digits);
};

export const formatCardExpiry = (value: string) => {
  let digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length > 2) {
    digits = digits.slice(0, 2) + "/" + digits.slice(2);
  }

  return digits;
};

export const isValidCardExpiry = (value: string): boolean => {
  if (!value) return false;

  const match = value.match(/^(\d{2})\/(\d{2})$/);

  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(match[2]);

  if (month < 1 || month > 12) return false;

  const now = new Date();

  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;

  if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
};

export const formatCvv = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 3);
};

export const isValidCvv = (value: string) => {
  return /^\d{3}$/.test(value);
};
