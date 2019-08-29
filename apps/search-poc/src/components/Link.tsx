
import React, { MouseEvent } from 'react';
import propTypes from 'prop-types';

import { HrefBuilderParams } from '../context/link';


const Link: React.FunctionComponent<{
  params: HrefBuilderParams
}> = ({ params, children }, { onLinkClick, buildHref }) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    onLinkClick(params);
  }
  const href = buildHref ? buildHref(params) : '#';

  return <a
    onClick={handleClick}
    href={href}
  >
    {children}
  </a>;
};

Link.contextTypes = {
  onLinkClick: propTypes.func,
  buildHref: propTypes.func,
}


export default Link;
