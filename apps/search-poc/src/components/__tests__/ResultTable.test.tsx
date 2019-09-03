import * as renderer from "react-test-renderer";
import ResultsTable from '../ResultTable.tsx';
import React from "react";
import { shallow, mount } from "enzyme";


it("ResultsTable renders correctly with header properties", () => {
  const props = { headerProperties: [{ title: "header title", dataIndex: 1}], items: [{id: 'id'}], total: 2, onRowClick: jest.fn()};
  
  const result = shallow(<ResultsTable {...props} />);
  expect(result).toMatchSnapshot();
});


it("ResultsTable renders rows", () => {
  const props = { headerProperties: [{ title: "header title", dataIndex: 1}], items: [{id: 'id'}], total: 2, onRowClick:jest.fn()};
  const wrapper = mount(<ResultsTable {...props} />);
  expect(wrapper.find('TableRow')).toHaveLength(1);
});

