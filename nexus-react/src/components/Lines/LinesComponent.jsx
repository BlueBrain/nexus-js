import React from 'react';
import style from './lines.css';

const LinesComponent = (canvasRefCallback, animate) => {
  let className = animate ? 'lines ' + style.lines + ' ' + style.fadeInAlmost : 'lines ' + style.lines;
  return (
    <canvas className={className} ref={canvasRefCallback}></canvas>
  );
}

export default LinesComponent;