import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlanetOrbitPlane = styled.div.attrs((props) => {
  const completion = (props.time % props.period) / props.period;

  return {
    style: {
      transform: `rotate3d(0, 1, 0, ${completion * 360}deg)`
    }
  };
})`
  position: absolute;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
`;

PlanetOrbitPlane.propTypes = {
  time: PropTypes.number
};

const PlanetWrapper = styled.div.attrs((props) => {
  const distance = props.distance;

  const completion = (props.time % props.period) / props.period;

  return {
    style: {
      transform: `translate3d(${distance}px, 0, 0) rotate3d(0, 1, 0, ${completion *
        -360}deg)`
    }
  };
})`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  overflow: hidden;
  width: ${(props) => props.radius}px;
  height: ${(props) => props.radius}px;
  margin-left: -${(props) => props.radius / 2}px;
  margin-top: -${(props) => props.radius / 2}px;
`;

PlanetWrapper.propTypes = {
  time: PropTypes.number
};

const GradientDefs = ({ colors, id }) => {
  if (colors < 2) return <div></div>;

  const reverseColors = [...colors].reverse();

  const steps = colors.length - 1;

  const lightSideRange = [0, 50];
  const lightStepSize = (lightSideRange[1] - lightSideRange[0]) / steps;

  const darkSideRange = [20, 40];
  const darkStepSize = (darkSideRange[1] - darkSideRange[0]) / steps;

  const sideRange = [30, 70];
  const sideStepSize = (sideRange[1] - sideRange[0]) / steps;

  return (
    <defs>
      <radialGradient id={`planet-gradient-light-${id}`}>
        {colors.map((color, index) => (
          <stop
            key={index}
            offset={`${lightSideRange[0] + lightStepSize * index}%`}
            stopColor={color}
          ></stop>
        ))}
      </radialGradient>
      <radialGradient id={`planet-gradient-dark-${id}`}>
        {reverseColors.map((color, index) => (
          <stop
            key={index}
            offset={`${darkSideRange[0] + darkStepSize * index}%`}
            stopColor={color}
          ></stop>
        ))}
        {/* <stop offset="20%" stopColor={colors.dark}></stop> */}
        {/* <stop offset="40%" stopColor={colors.light}></stop> */}
      </radialGradient>
      <linearGradient id={`planet-gradient-right-side-${id}`}>
        {colors.map((color, index) => (
          <stop
            key={index}
            offset={`${sideRange[0] + sideStepSize * index}%`}
            stopColor={color}
          ></stop>
        ))}
        {/* <stop offset="30%" stopColor={colors.light}></stop> */}
        {/* <stop offset="70%" stopColor={colors.dark}></stop> */}
      </linearGradient>
      <linearGradient id={`planet-gradient-left-side-${id}`}>
        {reverseColors.map((color, index) => (
          <stop
            key={index}
            offset={`${sideRange[0] + sideStepSize * index}%`}
            stopColor={color}
          ></stop>
        ))}
        {/* <stop offset="30%" stopColor={colors.dark}></stop> */}
        {/* <stop offset="70%" stopColor={colors.light}></stop> */}
      </linearGradient>
    </defs>
  );
};

GradientDefs.propTypes = {
  colors: PropTypes.array,
  id: PropTypes.string
};

const PlanetGradient = ({ id, radius, time, period, colors }) => {
  const completion = (time % period) / period;

  const lel = Math.PI * 2 * completion;
  const right = Math.sign(Math.cos(lel)) > 0;
  return (
    <>
      <svg style={{ width: '100%', height: '100%' }}>
        <GradientDefs colors={colors} id={id} />
        <circle
          cx={`${Math.cos(lel) * 50 + 50}%`}
          cy="50%"
          r={radius * 2}
          fill={`url(#planet-gradient-dark-${id})`}
        ></circle>
        <circle
          style={{ opacity: (Math.sin(lel) + 1) / 2 }}
          cx={`${-Math.cos(lel) * 50 + 50}%`}
          cy="50%"
          r={radius * 2}
          fill={`url(#planet-gradient-light-${id})`}
        ></circle>

        {right ? (
          <circle
            style={{ opacity: 1 - Math.abs(Math.sin(lel)) }}
            cx="30%"
            cy="50%"
            r={radius}
            fill={`url(#planet-gradient-right-side-${id})`}
          ></circle>
        ) : (
          <circle
            style={{ opacity: 1 - Math.abs(Math.sin(lel)) }}
            cx="70%"
            cy="50%"
            r={radius}
            fill={`url(#planet-gradient-left-side-${id})`}
          ></circle>
        )}
      </svg>
    </>
  );
};

PlanetGradient.propTypes = {
  id: PropTypes.string,
  radius: PropTypes.number,
  time: PropTypes.number,
  period: PropTypes.number,
  colors: PropTypes.array
};

const Planet = ({ planet, time }) => {
  return (
    <PlanetOrbitPlane time={time} period={planet.period}>
      <PlanetWrapper
        time={time}
        period={planet.period}
        distance={planet.distance}
        radius={planet.radius}
      >
        <PlanetGradient
          id={planet.id}
          time={time}
          period={planet.period}
          radius={planet.radius}
          colors={planet.colors}
        ></PlanetGradient>
      </PlanetWrapper>
    </PlanetOrbitPlane>
  );
};

Planet.propTypes = {
  planet: PropTypes.object,
  time: PropTypes.number
};

export default Planet;
