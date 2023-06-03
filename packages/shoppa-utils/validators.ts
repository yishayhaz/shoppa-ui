import { rsplit } from "./string";

export const ASCII_LETTERS = "abcdefghijklmnopqrstuvwxyz";
export const DIGITS = "0123456789";

export const MAX_EMAIL_LENGTH = 320;
export const MIN_EMAIL_LENGTH = 5;
export const MAX_EMAIL_USERNAME_LENGTH = 64;
export const MAX_EMAIL_DOMAIN_LENGTH = 255;
export const MAX_USERNAME_LENGTH = 64;
export const MIN_USERNAME_LENGTH = 5; // Two words, 2 letters each, one space

export const MAX_PASSWORD_LENGTH = 64;
export const MIN_PASSWORD_LENGTH = 8;

export const PHONE_LENGTH = 12;

export const ALLOWED_DOMAIN_CHARS = ASCII_LETTERS + DIGITS + "-.";
export const ALLOWED_EMAIL_CHARS =
  ASCII_LETTERS + DIGITS + "!#$%&'*+-/=?^_`{|}~@";

export const isEmail = (email: string): boolean => {
  if (typeof email !== "string") return false;
  if (email.length < MIN_EMAIL_LENGTH) return false;
  if (email.length > MAX_EMAIL_LENGTH) return false;
  if (!email.includes("@")) return false;
  if (!email.includes(".")) return false;

  const [beforeAt, afterAt = ""] = rsplit(email.toLowerCase(), "@", 1);

  if (beforeAt.length < 1) return false;
  if (beforeAt.length > MAX_EMAIL_USERNAME_LENGTH) return false;

  if (afterAt.length < 1) return false;
  if (afterAt.length > MAX_EMAIL_DOMAIN_LENGTH) return false;

  if (!afterAt.includes(".")) return false;
  if (afterAt.startsWith(".") || afterAt.endsWith(".")) return false;

  if (afterAt.split("").some((char) => !ALLOWED_DOMAIN_CHARS.includes(char)))
    return false;
  if (beforeAt.split("").some((char) => !ALLOWED_EMAIL_CHARS.includes(char)))
    return false;

  return true;
};

export const isName = (name: string): boolean => {
  if (typeof name !== "string") return false;
  if (name.length < MIN_USERNAME_LENGTH) return false;
  if (name.length > MAX_USERNAME_LENGTH) return false;

  if (!name.includes(" ")) return false;
  if (name.replace(" ", "").length < MIN_USERNAME_LENGTH - 1) return false;
  if (
    name
      .split(" ")
      .some(
        (word) =>
          word.length < 2 ||
          word.split("").some((char) => !Number.isNaN(Number.parseInt(char)))
      )
  )
    return false;

  return true;
};

export const isPassword = (password: string): boolean => {
  if (typeof password !== "string") return false;
  if (password.length < MIN_PASSWORD_LENGTH) return false;
  if (password.length > MAX_PASSWORD_LENGTH) return false;

  let hasDigit, hasLetter;

  for (const char of password.split("")) {
    if (DIGITS.includes(char)) hasDigit = true;
    else if (ASCII_LETTERS.includes(char)) hasLetter = true;

    if (hasDigit && hasLetter) break;
  }

  if (!hasDigit || !hasLetter) return false;

  return true;
};

export const cleanPhone = (phone: string): string => {
  if (phone.startsWith("+")) phone = phone.slice(1);
  if (phone.startsWith("05")) phone = "972" + phone.slice(1);

  return phone;
};

export const isPhone = (phone: string): boolean => {
  if (typeof phone !== "string") return false;

  phone = cleanPhone(phone);

  if (phone.length != PHONE_LENGTH) return false;

  if (!phone.startsWith("9725")) return false;

  return true;
};
