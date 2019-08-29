/**
 * Gets the last part of a uri path which represent a title or label
 *
 * @param string
 */
export const getLabel = (string: string): string => {
  const slash = string.substring(string.lastIndexOf('/') + 1);
  const title = slash.substring(slash.lastIndexOf('#') + 1);
  return title;
};

export const parseProjectUrl = (projectUrl: string) => {
  const projectUrlR = /projects\/([\w-]+)\/([\w-]+)\/?$/;
  const [, org, proj] = projectUrl.match(projectUrlR) as string[];
  return [org, proj];
};

export type ParsedNexusUrl = {
  deployment: string;
  entityType: string;
  org: string;
  project: string;
  schema: string;
  id: string;
};

const nexusEntities = [
  'orgs',
  'projects',
  'acls',
  'views',
  'resources',
  'files',
];

const nexusUrlR = new RegExp(
  [
    '^',
    '(https?://.+)', // nexus deployment
    '/',
    `(${nexusEntities.join('|')})`, // entity type
    '/',
    '([^/]+)', // org
    '/',
    '([^/]+)', // proj
    '/?',
    '([^/]+)?', // schema [optional]
    '/?',
    '([^/]+)?', // id [optional]
    '/?',
    '$',
  ].join(''),
);

/**
 * With given Nexus URL (might be self/project/id url), return it's:
 * * deployment URL
 * * entity type
 * * org label
 * * project label
 * * id
 *
 * @param nexusUrl
 */
export const parseNexusUrl = (nexusUrl: string): ParsedNexusUrl => {
  if (!nexusUrl) throw new Error('selfUrl should be defined');

  const mulEntityTypeR = new RegExp(`(${nexusEntities.join('|')})`, 'g');
  const mulEntityTypeMatch = nexusUrl.match(mulEntityTypeR);
  if (mulEntityTypeMatch && mulEntityTypeMatch.length > 1) {
    throw new Error(
      'Url contains multiple entity types which is not supported',
    );
  }

  const matches = nexusUrl.match(nexusUrlR);
  if (!matches || matches.length <= 5) {
    throw new Error('Error while parsing selfUrl');
  }

  return {
    deployment: matches[1],
    entityType: matches[2].slice(0, -1),
    org: matches[3],
    project: matches[4],
    schema: matches[5],
    id: matches[6],
  };
};

/**
 * this function changes cameCasedString to Camel Cased String
 * @author https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
 * @param labelString String in camelCase
 */
export const camelCaseToLabelString = (labelString: string): string => {
  return (
    labelString
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, str => str.toUpperCase())
  );
};

/**
 * this function changes camelCaseString to KebabCase
 * @author https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
 * @param camelCaseString String in camelCase
 */
export const camelToKebab = (camelCaseString: string): string => {
  return camelCaseString
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
};

/**
 * Build an href url by given template and properties,
 *
 * @example
 * const pathTemplate = '/resources/:selfUrl';
 * const selfUrl = '123'
 * const href = buildHref(pathTemplate, { selfUrl }) // /resources/123
 *
 * @param template [string]
 * @param props [object]
 */
export function buildHref(
  template: string,
  props: { [key: string]: string } = {},
) {
  return Object.keys(props).reduce((prev, key) => {
    const regExp = new RegExp(`:${key}`, 'g');
    return prev.replace(regExp, props[key]);
  }, template);
}
