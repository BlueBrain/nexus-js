import React from 'react';

import { buildHref as buildHrefWithTemplate } from '../utils';
import { history } from '../history';

const defaultHrefTmplByType: {
  [type: string]: string;
} = {
  resource: '/resources?self=:selfUrl',
  dashboard: '/?:search',
};

export const defaultLinkProviderContext = {
  onLinkClick: (params: HrefBuilderParams) => {
    const href = buildHrefWithTemplate(
      defaultHrefTmplByType[params.type],
      params,
    );
    history.push(href);
  },
  buildHref: (params: HrefBuilderParams) => {
    const tmpl = defaultHrefTmplByType[params.type];
    return buildHrefWithTemplate(tmpl, params);
  },
};

export type HrefBuilderParams = {
  type: string;
  [param: string]: string;
};

export const LinkContext = React.createContext(defaultLinkProviderContext);
