import * as React from 'react';
import './Workspace.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const randomInt = max => {
  return Math.floor(Math.random() * max) + 1;
};

export const makeWorkspaces = () => {
  const generate = (depth, maxDepth) => {
    if (depth > maxDepth) {
      return;
    }
    return [...Array(randomInt(10)).keys()].map(() => ({
      label: 'EModel Curation Pipeline',
      description:
        "Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! Eventually, you do plan to have dinosaurs on your dinosaur tour, right? What do they got in there? King Kong? Forget the fat lady! You're obsessed with the fat lady! Drive us out of here!",
      children: generate(depth + 1, maxDepth),
    }));
  };
  return [
    {
      label: 'Thalamus2019',
      description: 'This is thalamus project',
      children: generate(1, 1),
    },
    {
      label: 'NCx2019',
      description: 'NeoCortex Stuff',
      children: generate(1, 1),
    },
  ];
};

type Workspace = {
  label: string;
  description: string;
  children: Workspace[];
};

const Workspaces: React.FunctionComponent<{
  workspaces: Workspace[];
}> = ({ workspaces, children: childComponents }) => {
  return (
    <div className="workspaces-container">
      <Tabs defaultActiveKey="1" tabPosition={'left'}>
        {workspaces &&
          workspaces.length &&
          workspaces.map(({ label, description, children }, i) => (
            <TabPane
              tab={
                <div className="workspace-tab">
                  <span className="title ellipsis">{label}</span>
                  <p className="description fade">{description}</p>
                </div>
              }
              key={i.toString()}
            >
              <>{childComponents}</>
              <Workspaces workspaces={children} />
            </TabPane>
          ))}
      </Tabs>
    </div>
  );
};

export default Workspaces;
