import React from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import {useAppDispatch, useAppSelector} from '../../app/store';
import {signupTC} from './registration-reducer';
import {Navigate} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';

export const Registration = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.registration.isRegistered)

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
                    render={({ field }) => <Input {...field} />}
                />

                <Button type={'submit'} variant={'contained'} color={'primary'}>
                    Sign Up
                </Button>
            </FormGroup>
        </form>
    </>
};

type FormData = {
    login: string
    password: string
    confirmPassword: string
}