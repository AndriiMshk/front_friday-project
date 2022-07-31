import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import { CardsTable } from './CardsTable';
import { setCardsTC } from './cards-reducer';

export const Cards = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.profile._id);
  const packUserId = useAppSelector(state => state.cards.packUserId);
  const cards = useAppSelector(state => state.cards.cards);
  const page = useAppSelector(state => state.cards.page);

  const rowsPerPage = useAppSelector(state => state.cards.pageCount);
  const pageCount = useAppSelector(state => state.cards.cardsTotalCount);

  const { packId } = useParams<'packId'>();

  useEffect(() => {
    if (packId) {
      dispatch(setCardsTC({ cardsPack_id: packId, page, pageCount: rowsPerPage }));
    }
  }, [packId, page, rowsPerPage, pageCount]);

  return (
    <div>
      <CardsTable cards={cards} userId={userId} pageCount={pageCount} rowsPerPage={rowsPerPage} />
    </div>
  );
};

