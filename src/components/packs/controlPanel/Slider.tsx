import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { sortPacksByCardsCountAction } from '../bll-dal/packs-reducer';

export const SliderFilter = ({ setTempValues, tempValues }: SliderFilterPropsType) => {

  const dispatch = useAppDispatch();

  const filterByCardsCount = useAppSelector(state => state.packs.filterValues.filterByCardsCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const isLoading = useAppSelector(state => state.app.isLoading);

  useEffect(() => {
    setTempValues({ min: minCardsCount, max: maxCardsCount });
    if (filterByCardsCount.min && filterByCardsCount.max) {
      if (filterByCardsCount.min < tempValues.max || filterByCardsCount.max > tempValues.min) {
        dispatch(sortPacksByCardsCountAction({ min: undefined, max: undefined }));
      }
    }
  }, [minCardsCount, maxCardsCount]);

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setTempValues({ ...tempValues, min: Math.min(newValue[0], filterByCardsCount.max || maxCardsCount) });
    } else {
      setTempValues({ ...tempValues, max: Math.max(newValue[1], filterByCardsCount.min || minCardsCount) });
    }
  };

  return (
    <Box sx={{ width: 300, display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: '30px', textAlign: 'center' }}>{tempValues.min}</div>
      <Slider
        disabled={isLoading}
        style={{ width: '60%' }}
        getAriaLabel={() => 'Minimum distance'}
        value={[tempValues.max, tempValues.min]}
        onChange={handleChange}
        onChangeCommitted={() => {dispatch(sortPacksByCardsCountAction(tempValues));}}
        valueLabelDisplay="auto"
        disableSwap
        max={maxCardsCount}
        min={minCardsCount} />
      <div style={{ width: '30px', textAlign: 'center' }}>{tempValues.max}</div>
    </Box>
  );
};

type SliderFilterPropsType = {
  tempValues: any, setTempValues: any
}
