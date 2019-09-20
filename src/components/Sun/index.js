import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SunWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  overflow: hidden;
  width: ${(props) => props.radius}px;
  height: ${(props) => props.radius}px;
  margin-left: -${(props) => props.radius / 2}px;
  margin-top: -${(props) => props.radius / 2}px;
  background: radial-gradient(circle, #fffff0 60%, #fbffb9 80%);
  box-shadow: 0 0 20px 20px #f0ffb610, 0 0 60px 30px #f0ffb6;
  transform-style: preserve-3d;
`;

const Sun = ({ radius }) => {
  return <SunWrapper radius={radius} />;
};

Sun.propTypes = {
  radius: PropTypes.number
};

export default Sun;
