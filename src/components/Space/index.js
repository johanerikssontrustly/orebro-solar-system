import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Planet from '../Planet';
import Sun from '../Sun';

const PlanetContainer = styled.div.attrs(() => ({
  style: {
    background: 'transparent'
  }
}))`
  width: 100%;
  height: 100%;
  perspective: 30cm;
  perspective-origin: 50% 10%;
  transform-style: preserve-3d;
`;

const Background = styled.div.attrs(({ time }) => {
  return {
    style: {
      background: `linear-gradient(${(time / 2000) *
        10}deg, #8a2387, #e94057, #f27121)`
    }
  };
})`
  height: 100%;
`;

const Space = ({ planets, time }) => {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setHue((hue) => (hue + 1) % 360);
    }, 24);

    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Background time={time}>
      <PlanetContainer hue={hue}>
        {planets.map((planet, index) => (
          <Planet key={index} planet={planet} time={time} />
        ))}
        <Sun radius={100} />
      </PlanetContainer>
    </Background>
  );
};

Space.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object),
  time: PropTypes.number
};

export default Space;
