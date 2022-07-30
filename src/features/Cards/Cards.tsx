import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useNavigate, useParams} from "react-router-dom";
import {getCardsTC} from "./cards-reducer";
import {CardsTable} from "./CardsTable";

export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const cards = useAppSelector(state=>state.cards)

    const {packId} = useParams<'packId'>();

    useEffect(() => {
        if (packId) {
            dispatch(getCardsTC(packId))
        }
    }, []);
    return (
        <div>
            <CardsTable/>
        </div>
    );
};

