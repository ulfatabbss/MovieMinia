import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Please provide valid email'),
    password: Yup.string()
        .required('Password is required'),

});
export const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
        .email('InValid email')
        .required('Please enter your email address'),
    password: Yup.string()
        .required('Please enter your password.')
        .min(8, 'Password is too short.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must contain min 8 characters uppercase,lowercase,number and special symbol',
        ),
    confirmPassword: Yup.string()
        .required('No Confirm Password provided.')
        .label('Confirm Password')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
});