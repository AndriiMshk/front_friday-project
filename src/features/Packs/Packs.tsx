import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {PacksTable} from "./PacksTable";
import {getPacksTC} from "./packs-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";

export const Packs = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)
    const packs = useAppSelector(state=>state.packs)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [])
/*
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }*/
    return (
        <div>
            <PacksTable/>
        </div>
    );
    }



