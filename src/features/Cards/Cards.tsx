import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import { CardsTable } from './CardsTable';
import { createCardTC, setCardsTC } from './cards-reducer';
import { Button } from '@mui/material';

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

//временная заглушка на добавление карточки
  const addNewCardHandler = () => {
    const question = prompt('question');
    const answer = prompt('answer');
    if (packId && question && answer) {
      dispatch(createCardTC({ cardsPack_id: packId, question, answer }));
    }
  };

  useEffect(() => {
    if (packId) {
      dispatch(setCardsTC({ cardsPack_id: packId, page, pageCount: rowsPerPage }));
    }
  }, [packId, page, rowsPerPage, pageCount, cards.length]);

  return (
    <div>
      {userId !== packUserId
        ? <div><h3>Name Pack</h3></div>
        : <div>
          <h3>Name Pack</h3>
          <Button
            onClick={addNewCardHandler}
            variant="contained"
          >Add new card</Button>
        </div>}
      <CardsTable cards={cards} userId={userId} pageCount={pageCount} rowsPerPage={rowsPerPage} />
    </div>
  );
};

