import React, { useEffect, useState } from 'react';
import { CardType } from '../Cards/cardsApi';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCardsTC, updateCardGradeTC } from '../Cards/cards-reducer';
import { useParams } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import style from './style.module.css';

const grades = [
  {
    title: 'не знал',
    grage: 1,
  },
  {
    title: 'забыл',
    grage: 2,
  },
  {
    title: 'долго думал',
    grage: 3,
  },
  {
    title: 'перепутал',
    grage: 4,
  },
  {
    title: 'знал',
    grage: 5,
  },
];

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
    const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
    return { sum: newSum, id: newSum < rand ? i : acc.id };
  }, { sum: 0, id: -1 });
  return cards[res.id + 1];
};

export const LearnPage = () => {

  const dispatch = useAppDispatch();

  const { packId } = useParams<'packId'>();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [card, setCard] = useState<CardType>({} as CardType);

  const cards = useAppSelector(state => state.cards.cards);

  const formik = useFormik({
    initialValues: {
      grade: 0,
    },
    onSubmit: values => {
      setIsChecked(false);
      setCard(getCard(cards));
      if (card._id) {
        dispatch(updateCardGradeTC(card._id, values.grade));
      }
    },
  });

  useEffect(() => {
    dispatch(setCardsTC({ cardsPack_id: packId }));
    if (cards.length) {
      setCard(getCard(cards));
    }
  }, [packId]);

  return (
    <div className={style.container}>
      <h2>Learn ******</h2>
      <Paper className={style.content}>
        <h3>Question:</h3>
        <p>{card.question}</p>
        <p>Количество попыток ответов на вопрос: {card.shots}</p>
        {!isChecked
          ? <Button variant="contained" onClick={() => setIsChecked(true)}>Show answer</Button>
          : <>
            <h3>Answer: {card.answer}</h3>
            <h5>Rate yourself:</h5>
            <FormControl>
              <form onSubmit={formik.handleSubmit}>
                <RadioGroup
                  name="grade"
                >
                  {grades.map((el, index) =>
                    <FormControlLabel
                      key={index}
                      value={el.grage}
                      control={<Radio />}
                      label={el.title}
                      onChange={formik.handleChange}
                    />)}
                </RadioGroup>
                <Button
                  variant="contained"
                  type="submit"
                >Next</Button>
              </form>
            </FormControl>
          </>}
      </Paper>
    </div>
  );
};

