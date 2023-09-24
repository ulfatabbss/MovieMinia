const Yup = require('yup');

// Login Validation Schema
const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide valid email'),
  password: Yup.string().required('Password is required'),
});

// SignUp Validation Schema
const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password is too short.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain min 8 characters uppercase, lowercase, number, and special symbol',
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password.')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

// OTP Verification Schema
const otpVerification = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide valid email'),
});

// Change Password Schema
const changePassword = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password is too short.')
    .max(15, 'Password is too long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain min 8 characters uppercase, lowercase, number, and special symbol',
    ),
  confirmPassword: Yup.string()
    .required('No Confirm Password provided.')
    .label('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

module.exports = {
  LoginValidationSchema,
  SignUpValidationSchema,
  otpVerification,
  changePassword,
};
