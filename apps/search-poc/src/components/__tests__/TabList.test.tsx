import * as renderer from "react-test-renderer";
import React from "react";
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import TabList from '../TabList.tsx';
import { shallow } from "enzyme";


it("TabList renders correctly with work items", () => {
  const props = { items: [{id: 'id', onSelected: () => {}, defaultActiveId: '1'}], onSelected: jest.fn};
  
  const result = shallow(<TabList {...props} />);
  expect(result).toMatchSnapshot();
});