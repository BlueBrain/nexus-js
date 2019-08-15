// For getting the last part of a uri path as a title or label
export const labelOf = (string: string) => {
  const slash = string.substring(string.lastIndexOf('/') + 1);
  const title = slash.substring(slash.lastIndexOf('#') + 1);
  return title;
};

const projectUrlR = /projects\/([\w-]+)\/([\w-]+)\/?$/;

export const parseProjectUrl = (projectUrl: string) => {
  const [, org, proj] = projectUrl.match(projectUrlR) as string[];
  return [org, proj];
};
