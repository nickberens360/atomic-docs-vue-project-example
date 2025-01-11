export const required = val => val === 0 || !!val || '*Required';

export const emailRules = [
  (v) => (v || '').length <= 50 || 'Max 50 characters',
  (v) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(v) || 'Invalid e-mail.';
  },
];

export const phoneNumRules = [
  (v) => !!v || 'Phone required',
  (v) =>
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
      v
    ) || 'Phone Number must be valid',
];

export const passwordResetRules = [
  (value) => !!value || 'Password required',
  (value) => value.length >= 12 || 'Password must be at least 12 characters long.',
  (value) => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter.',
  (value) => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter.',
  (value) => /[0-9]/.test(value) || 'Password must contain at least one number.',
  (value) => /[.\-#@!/:;()$&"?'+*_]/.test(value) || 'Password must contain at least one of these special characters: . - # @ ! / : ; ( ) $ & " ? \' + * _',
  (value) => !/[^.\-#@!/:;()$&"?'+*_a-zA-Z0-9]/.test(value) || 'Password can only include these special characters: . - # @ ! / : ; ( ) $ & " ? \' + * _'
];