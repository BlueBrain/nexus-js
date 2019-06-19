import * as React from 'react';
import useNexus from './useNexus';
import { Identity, ACL } from '@bbp/nexus-sdk';

const matchAnonymous = (identity: Identity, acl: ACL['acl']) => {
  return (
    identity['@type'] === 'Anonymous' && acl['@type'] === identity['@type']
  );
};
const matchAuthenticated = (identity, acl) => {
  return (
    identity['@type'] === 'Authenticated' &&
    acl['@type'] === identity['@type'] &&
    acl['realm'] === identity['realm']
  );
};
const matchUser = (identity, acl) => {
  return (
    identity['@type'] === 'User' &&
    acl['@type'] === identity['@type'] &&
    acl['realm'] === identity['realm'] &&
    acl['subject'] === identity['subject']
  );
};

const matchGroup = (identity, acl) => {
  return (
    identity['@type'] === 'Group' &&
    acl['@type'] === identity['@type'] &&
    acl['realm'] === identity['realm'] &&
    acl['group'] === identity['group']
  );
};
// matches a list of identities with an ACL
const matchIdentity = (identities: Array<any>, acl: any): any | false => {
  const doesMatch = identities.find(identity => {
    if (identity['@type'] === acl['@type']) {
      switch (identity['@type']) {
        case 'Anonymous':
          return matchAnonymous(identity, acl);
        case 'User':
          return matchUser(identity, acl);
        case 'Authenticated':
          return matchAuthenticated(identity, acl);
        case 'Group':
          return matchGroup(identity, acl);
      }
    }
    return false;
  });
  return doesMatch ? acl : false;
};

// for each ACL, match self_identity with acl_identity
// if match, check if permissions contain one or more requiredPermissions
// if yes, remove requiredPermission(s) from check list
// in the end, return check list
// if empty, you have access, if not, you don't (and you get the list of missing permissions)
const checkPermissions = (
  permissions: Array<string>,
  path: string = '/',
) => async nexus => {
  const identities = await nexus.Identity.list();
  const acls = await nexus.ACL.list(path, {
    ancestors: true,
    self: true,
  });

  // what ACLs are valid base on our identities
  const validAcls: Array<any> = acls._results.reduce(
    (flattenACLs, currentACL) => [
      ...flattenACLs,
      ...currentACL.acl.reduce(
        (valid, acl) =>
          matchIdentity(identities.identities, acl.identity)
            ? [...valid, acl]
            : valid,
        [],
      ),
    ],
    [],
  );

  // grab the list of permissions that are not in the ACLs
  const checkList = validAcls.reduce((checkList, acl) => {
    return checkList.filter(
      permission => !acl.permissions.includes(permission),
    );
  }, permissions);

  return new Promise((resolve, reject) => {
    // if check list if empty, we have the necessary permissions
    if (checkList.length === 0) {
      resolve(true);
    }
    // if not reject with missing permissions
    reject(checkList);
  });
};

export type AccessControlProps = {
  permissions: Array<string>;
  path: string;
  children: React.ReactNode;
  noAccessComponent?: ({
    missingPermissions,
  }: {
    missingPermissions: string[];
  }) => React.ReactNode | React.ReactNode;
  loadingComponent?: React.ReactNode;
};

/**
 * Usage:
 * ```tsx
 * <AccessControl
 *    permissions={["projects/read", "resources/write"]}
 *    path="/org"
 *    noAccessComponent={(missingPerms: string[]) => <NoAccessComponent />}
 *    loadingComponent={}
 * >
 *   <AccessComponent />
 * </AccessControl>
 * ```
 */
export const AccessControl: React.FunctionComponent<
  AccessControlProps
> = props => {
  const state = useNexus<any, string[]>(
    checkPermissions(props.permissions, props.path),
  );
  if (state.loading) {
    return props.loadingComponent ? <>props.loadingComponent</> : null;
  }
  if (state.error) {
    return props.noAccessComponent ? (
      typeof props.noAccessComponent === 'function' ? (
        <>{props.noAccessComponent({ missingPermissions: state.error })}</>
      ) : (
        <>props.noAccessComponent</>
      )
    ) : null;
  }
  return <>props.children</>;
};
