import React from 'react';
import style from './logo.css';
import logo from '../../../img/logo.png';

const LogoComponent = ({ className }) => {
  className += ' logo';
  return (
    <img className={className} src={logo} />
  );
}

export default LogoComponent;