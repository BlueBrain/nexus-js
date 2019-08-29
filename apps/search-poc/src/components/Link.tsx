
import React from 'react';
import PropTypes from 'prop-types';

import { HrefBuilderParams } from '../index';


const Link: React.FunctionComponent<{
  params: HrefBuilderParams
}> = ({ params, children }, { onResourceClick, buildHref }) => {
  const handleClick = () => onResourceClick(params);
  const href = buildHref ? buildHref(params) : '#';

  return <a
    onClick={handleClick}
    href={href}
  >
    {children}
  </a>;
};

Link.contextTypes = {
  onResourceClick: PropTypes.func,
  buildHref: PropTypes.func,
}


export default Link;
