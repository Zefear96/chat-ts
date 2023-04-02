import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { FormWrapper } from './SignInAndUpStyles';

const SignUpSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});

interface MyFormValues {
    email: string;
    password: string;
    displayName: string;
}

const SignUpWithEmail = ({signUpWithEmail}: any) => {
  const initialValues: MyFormValues = { email: '', password: '', displayName: '' };
  return (
    <Formik
         initialValues={initialValues}
         validationSchema={SignUpSchema}
         onSubmit={(values) => {
           signUpWithEmail( values.email, values.password, values.displayName );
         }}
       >
         {({ errors, touched, values, handleChange }) => (
          <Form>
            <FormWrapper>
                <h2>Sign Up</h2>
                <TextField 
                id="displayName" 
                name="displayName" 
                label="Name" 
                variant="outlined" 
                value={values.displayName}
                onChange={handleChange}
                error={touched.displayName && Boolean(errors.displayName)}
                helperText={touched.displayName && errors.displayName}
                fullWidth
                />
                <TextField 
                id="email" 
                name="email" 
                label="Email" 
                variant="outlined" 
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                sx={{
                    marginTop: '16px',
                }}
                />
                <TextField 
                id="password" 
                name="password" 
                label="Password" 
                variant="outlined" 
                type="password" 
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
                fullWidth
                />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
                </FormWrapper>
          </Form>
        )}
      </Formik>
  )
}

export default SignUpWithEmail