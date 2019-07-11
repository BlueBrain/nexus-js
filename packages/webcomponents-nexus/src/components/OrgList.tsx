import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { OrganizationList } from '@bbp/nexus-sdk';

const OrgList = () => {
  const { loading, data, error } = useNexus<OrganizationList>(nexus =>
    nexus.Organization.list(),
  );

  if (loading) {
    return <p>Loading orgs...</p>;
  }
  if (error) {
    return <p>an error happened</p>;
  }

  return (
    <ul>
      {data._results.map(org => (
        <li>{org._label}</li>
      ))}
    </ul>
  );
};

export default OrgList;
