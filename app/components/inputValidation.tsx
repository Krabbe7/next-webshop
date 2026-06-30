export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.(dk|com)$/i.test(email);
};
export const formatPostalCode = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 4);
};
export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);

  return digits.replace(/(\d{4})(?=\d)/g, "$1-");
};
export const formatCardExpiry = (value: string) => {
  let formatted = value.replace(/\D/g, "").slice(0, 4);

  if (formatted.length > 2) {
    formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
  }

  return formatted;
};
export const isValidCardExpiry = (value: string): boolean => {
  if (!value || value.length !== 5) return false;

  const [mmStr, yyStr] = value.split("/");

  const month = Number(mmStr);
  const year = Number(yyStr);

  if (!Number.isInteger(month) || !Number.isInteger(year)) return false;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100; // fx 26
  const currentMonth = now.getMonth() + 1;

  const isExpired =
    year < currentYear || (year === currentYear && month < currentMonth);

  if (isExpired) return false;

  return true;
};
export const formatCvv = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 3);
};
