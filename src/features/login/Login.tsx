import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import styles from './Login.module.css'
import {loginTC} from "./login-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from 'react-router-dom';
import itIncubator from "../../assets/it-inkubator.png";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must contain more than 8 symbols'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))

        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Sign In</div>
                <FormGroup>
                    <TextField label="Email"
                               margin="normal"
                               {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}

                    <TextField type="password"
                               label="Password"
                               margin="normal"
                               {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}

                    <FormControlLabel label={'Remember me'}
                                      control={<Checkbox
                                          checked={formik.values.rememberMe}
                                          {...formik.getFieldProps('rememberMe')}
                                      />}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </form>
        </div>

    )
}

