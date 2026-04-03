interface ValidationMessage {
  required: string;
  string: string;
  number: string;
  minLength: (n: number) => string;
  maxLength: (n: number) => string;
  email: string;
  alphanumeric: string;
  alphanumericUnderscore: string;
}

export const validationMessage = (name: string): ValidationMessage => ({
  required: `${name} is required`,
  string: `${name} must be a string`,
  number: `${name} must be a number`,
  minLength: (n: number) => `${name} must be at least ${n} characters`,
  maxLength: (n: number) => `${name} must be at most ${n} characters`,
  email: `Invalid email`,
  alphanumeric: `${name} can only contain letters and numbers`,
  alphanumericUnderscore: `${name} can only contain letters, numbers, and underscores`,
});
