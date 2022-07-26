import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {signupTC} from './registration-reducer';
import {Link, Navigate} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

export const Registration = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.registration.isRegistered)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const {control, handleSubmit, reset, formState: {errors}, getValues} = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            login: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onClickShowPassword = () => setShowPassword(!showPassword)
    const onClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    const onSubmit: SubmitHandler<FormData> = data => {
        dispatch(signupTC(data.login, data.password))
        reset()
    }

    if (isRegistered) return <Navigate to={'/login'}/>

    return <Paper elevation={2} sx={{marginTop: '60px', width: '413px', paddingTop: '35px', paddingBottom: '42px'}}>

        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name="login"
                    control={control}
                    rules={{
                        required: 'Required field',
                        pattern: {
                            value: /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i,
                            message: 'Please, enter correct email address'
                        }
                    }}
                    render={({field}) => (
                        <TextField sx={{width: '347px', height: '71px', mt: '41px'}}
                                   label="Email"
                                   variant="standard"
                                   helperText={errors?.login && errors?.login?.message || ''}
                                   error={!!errors?.login}
                                   {...field}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Required field',
                        minLength: {
                            value: 8,
                            message: 'Password less than 8 symbols'
                        }
                    }}
                    render={({field}) => (<>
                        <TextField sx={{width: '347px', height: '71px', mt: '6px'}}
                                   label="Password"
                                   variant="standard"
                                   type={showPassword ? 'text' : 'password'}
                                   helperText={errors?.password && errors?.password?.message || ''}
                                   error={!!errors?.password}
                                   {...field}
                        />
                        <IconButton sx={{color: 'black'}} onClick={onClickShowPassword} >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </>)}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: 'Required field',
                        validate: {
                            equal: v => v === getValues().password ? true : "Passwords don't match"
                        }
                    }}
                    render={({field}) => (<>
                        <TextField sx={{width: '347px', height: '71px', mt: '6px'}}
                                   label="Confirm password"
                                   variant="standard"
                                   type={showConfirmPassword ? 'text' : 'password'}
                                   helperText={errors?.confirmPassword && errors?.confirmPassword?.message || ''}
                                   error={!!errors?.confirmPassword}
                                   {...field}
                        />
                        <IconButton sx={{color: 'black'}} onClick={onClickShowConfirmPassword} >
                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </>)}
                />

                <Button type={'submit'}
                        variant={'contained'}
                        sx={{
                            borderRadius: '30px',
                            width: '347px',
                            height: '36px',
                            bgcolor: '#366EFF',
                            mt: '60px',
                            mb: '31px'
                        }}
                >
                    Sign Up
                </Button>
            </FormGroup>
        </form>

        <div>Already have an account?</div>
        <Link to="/login"> Sign In </Link>
    </Paper>
};

type FormData = {
    login: string
    password: string
    confirmPassword: string
}