import TableRow from '@mui/material/TableRow';
import { Button, Rating, TableCell } from '@mui/material';
import { formatDate } from '../Packs/PacksTable';
import styles from './Cards.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';
import { CardType } from './cardsApi';

export const CardItem: React.FC<CardItemPropsType> = ({ card, userId, deleteCardHandler, updateCardHandler }) => {
  return (
    <TableRow
      key={card._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="right">{card.answer}</TableCell>
      <TableCell align="right"><Rating name="read-only" value={card.grade} readOnly />
      </TableCell>
      {/*@ts-ignore*/}
      <TableCell align="right">{formatDate(card.updated)}</TableCell>
      <TableCell className={styles.buttonBlock} sx={{ textAlign: 'right' }}>
        <Button
          onClick={() => deleteCardHandler(card._id)}
          disabled={userId !== card.user_id}
          color="error"
          size="small"
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button
          onClick={() => updateCardHandler(card._id)}
          disabled={userId !== card.user_id}
          color="secondary" size="small"
          startIcon={<BorderColorIcon />}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

type CardItemPropsType = {
  card: CardType
  userId: string
  deleteCardHandler: (cardId: string | undefined) => void
  updateCardHandler: (cardId: string | undefined) => void
}