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

/**
 * Give a resource Self URL, return it's org label and project label
 *
 * @param selfUrl the resource Self URL
 */
export const getOrgAndProjectLabel = (
  selfUrl: string,
): { org: string; project: string } | undefined => {
  const matches = selfUrl.match(
    /^.*\/v[0-9]\/(?:\w+)\/([^\/]+)\/([^\/?#]+).*$/,
  );
  if (!matches || matches.length !== 3) {
    return;
  }
  return {
    org: matches[1],
    project: matches[2],
  };
};
