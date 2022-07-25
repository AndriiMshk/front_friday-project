import React, {useState} from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import Input from "@material-ui/core/Input";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {signupTC} from './registration-reducer';
import {Link, Navigate} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Registration = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.registration.isRegistered)
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const { control, handleSubmit } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data)
    }

    if (isRegistered) return <Navigate to={'/login'} />

    return <>
        <h2>Sign Up</h2>

        {/*<button onClick={() => {dispatch(signupTC('blabla@blaa.bla', 'A123456z'))}}>*/}
        {/*    тест регистрация*/}
        {/*</button>*/}

        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name='login'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <Input {...field} />}
                />
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <Input {...field} />}
                />

                <Controller
                    name='confirmPassword'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
                            <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
                            <Input
                                id="confirm-password"
                                // type={values.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle visibility"
                                            // onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                        >
                                            {/*{values.showPassword ? <VisibilityOff /> : <Visibility />}*/}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...field}
                            />
                        </FormControl>
                    )}
                />

                <Button type={'submit'} variant={'contained'} color={'primary'}
                        sx={{borderRadius: '30px', width: '347px', height: '36px'}}
                >
                    Sign Up
                </Button>
            </FormGroup>
        </form>

        <p>Already have an account?</p>
        <Link to='/login' > Sign In </Link>
    </>
};

type FormData = {
    login: string
    password: string
    confirmPassword: string
}