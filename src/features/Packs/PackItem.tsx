import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './PacksTable.module.css';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditInput } from '../../common/editInput/EditInput';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React from 'react';
import { formatDate } from './PacksTable';
import { PackType } from './packsApi';

export const PackItem: React.FC<PackItemPropsType> = ({ pack, userId, deletePackHandler, changePackNameHandler }) => {

  const navigate = useNavigate();

  return (
    <TableRow
      key={pack._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ textAlign: 'right' }}>
        <NavLink className={styles.pack}
                 to={`/cards/${pack._id}/${pack.name}`}
        >{pack.name}</NavLink>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{pack.user_name}</TableCell>
      <TableCell align="right">{formatDate(pack.updated)}</TableCell>
      <TableCell className={styles.buttonBlock} sx={{ textAlign: 'right' }}>
        <Button
          onClick={() => deletePackHandler(pack._id)}
          disabled={userId !== pack.user_id}
          color="error"
          size="small"
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <EditInput
          value={pack.name}
          callBack={(newPackName) => changePackNameHandler(pack._id, newPackName)}
          myId={pack.user_id}
          userId={userId}
        />
        <Button
          disabled={pack.cardsCount === 0}
          onClick={() => {
            navigate(`/learn/${pack._id}/${pack.name}`);
          }} color="secondary" size="small"
          startIcon={<MenuBookIcon />}>
          Learn
        </Button>
      </TableCell>
    </TableRow>
  );
};

type PackItemPropsType = {
  pack: PackType
  userId: string
  deletePackHandler: (packId: string) => void
  changePackNameHandler: (packId: string, newPackName: string) => void
}