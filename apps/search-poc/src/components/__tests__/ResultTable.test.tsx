import * as renderer from "react-test-renderer";
import ResultsTable from '../ResultTable.tsx';
import React from "react";
import { shallow } from "enzyme";


it("ResultsTable renders correctly with header properties", () => {
  const props = { headerProperties: [], items: [{id: 'id'}], total: 1, onRowClick: jest.fn};
  
  const result = shallow(<ResultsTable {...props} />);
  expect(result).toMatchSnapshot();
});