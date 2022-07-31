import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import { CardsTable } from './CardsTable';
import { createCardTC, setCardsTC } from './cards-reducer';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useDebounce from '../../common/hooks/useDebounce';

export const Cards = () => {

  const [question, setQuestion] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.profile._id);
  const packUserId = useAppSelector(state => state.cards.packUserId);
  const cards = useAppSelector(state => state.cards.cards);
  const page = useAppSelector(state => state.cards.page);
  const rowsPerPage = useAppSelector(state => state.cards.pageCount);
  const pageCount = useAppSelector(state => state.cards.cardsTotalCount);

  const { packId } = useParams<'packId'>();

  const packName = useAppSelector(state => state.packs.cardPacks.find(el => el._id === packId)?.name);

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
      dispatch(setCardsTC({ cardsPack_id: packId, page, pageCount: rowsPerPage, cardQuestion: question }));
    }
  }, [packId, page, rowsPerPage, pageCount, cards.length, useDebounce(question)]);

  return (
    <div>
      {userId !== packUserId
        ? <div><h3>{packName}</h3></div>
        : <div>
          <h3>{packName}</h3>
          <Button
            onClick={addNewCardHandler}
            variant="contained"
          >Add new card</Button>
        </div>}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="search"
          label="search"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Box>
      <CardsTable cards={cards} userId={userId} pageCount={pageCount} rowsPerPage={rowsPerPage} />
    </div>
  );
};

