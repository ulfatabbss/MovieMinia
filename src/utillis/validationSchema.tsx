import * as Yup from 'yup';

export const LoginValidationSchema: Yup.SchemaOf<{
  email: string;
  password: string;
}> = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide valid email'),
  password: Yup.string().required('Password is required'),
});

export const SignUpValidationSchema: Yup.SchemaOf<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}> = Yup.object().shape({
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
    .required('No Confirm Password provided.')
    .label('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
export const otpVerification: Yup.SchemaOf<{
  email: string;
}> = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide valid email'),
});
export const changePassword: Yup.SchemaOf<{
  password: string;
  confirmPassword: string;
}> = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password is too short.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain min 8 characters uppercase, lowercase, number, and special symbol',
    ),
  confirmPassword: Yup.string()
    .required('No Confirm Password provided.')
    .label('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
