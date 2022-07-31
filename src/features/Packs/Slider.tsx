import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}`;
}

const minDistance = 10;

export const SliderFilter: React.FC<SliderFilterPropsType> = (
  {
    filterByCardsCount,
    setFilterByCardsCount,
  },
) => {

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFilterByCardsCount([Math.min(newValue[0], filterByCardsCount[1] - minDistance), filterByCardsCount[1]]);
    } else {
      setFilterByCardsCount([filterByCardsCount[0], Math.max(newValue[1], filterByCardsCount[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={filterByCardsCount}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
};

type SliderFilterPropsType = {
  filterByCardsCount: number[]
  setFilterByCardsCount: (values: number[]) => void
}