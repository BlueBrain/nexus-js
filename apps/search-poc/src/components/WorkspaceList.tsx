import * as React from 'react';
import './WorkspaceList.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

type WorkspaceItem = {
  id: string;
  label: string;
  description: string;
};

const WorkspaceList: React.FunctionComponent<{
  items: WorkspaceItem[];
  onWorkspaceSelected: (id: string) => void;
  defaultActiveId?: string;
}> = ({ items, onWorkspaceSelected, defaultActiveId, children }) => {
  return (
    <div className="workspace-list">
      <Tabs
        defaultActiveKey={defaultActiveId}
        tabPosition={'left'}
        onChange={onWorkspaceSelected}
      >
        {items.map(({ label, description, id }) => (
          <TabPane
            tab={
              <div className="workspace-tab">
                <span className="title ellipsis">{label}</span>
                <p className="description fade">{description}</p>
              </div>
            }
            key={id}
          >
            {children}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkspaceList;
