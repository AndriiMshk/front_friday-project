import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PacksTable } from './PacksTable';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { setPacksTC } from './packs-reducer';

export const Packs = () => {
  const dispatch = useAppDispatch();

  // const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)
  // const packs = useAppSelector(state=>state.packs)
  const packs = useAppSelector(state => state.packs.cardPacks);
  const userId = useAppSelector(state => state.profile._id);

  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  const test1 = useAppSelector(state => state.packs)
  const test2 = useAppSelector(state => state.cards)
  console.log(test1);
  console.log(test2);

  // useEffect(() => {
  //     dispatch(getPacksTC())
  // }, [])

  useEffect(() => {
    dispatch(setPacksTC({page, pageCount }));
  }, []);
  /*
      if (!isLoggedIn) {
          return <Navigate to={'/login'}/>
      }*/
  return (
    <div>
      <PacksTable packs={packs} userId={userId} />
    </div>
  );
};



