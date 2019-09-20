import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Space from './components/Space';

const planets = [
  {
    id: 'chaos',
    radius: 70,
    distance: 400,
    period: 1000 * 60,
    colors: ['hsla(372, 86%, 63%, 1)', '#43224f']
  },
  {
    id: 'ceres',
    radius: 90,
    distance: 600,
    period: 1000 * 20,
    colors: ['#A5FECB', 'rgb(13, 7, 43)']
  }
];

// light: '#c31432',
//       dark: '#240b36'

const App = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => time + 12 * 2);
    }, 6);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* <input
        type="range"
        min="0"
        max="60000"
        value={time}
        onChange={(event) => {
          console.log('Time', time);
          setTime(parseInt(event.target.value));
        }}
      /> */}
      <Space planets={planets} time={time} />
    </>
  );
};

App.propTypes = {
  children: PropTypes.node
};

export default App;
