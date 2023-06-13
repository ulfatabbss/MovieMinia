import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please provide valid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),

});