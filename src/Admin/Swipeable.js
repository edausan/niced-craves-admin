import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const Swipeable = ({ index, setIndex, children }) => {
  return (
    <SwipeableViews index={index} onChangeIndex={(index) => setIndex(index)}>
      {children}
    </SwipeableViews>
  );
};

export default Swipeable;
