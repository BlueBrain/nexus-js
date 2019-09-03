import * as renderer from "react-test-renderer";
import Filter from '../Filters';
import React from "react";
import { shallow, mount } from "enzyme";

it('filter renders correctly', () => {
    const props = { appliedFilters :  {}, filters: [{name: 'filterName', values:[{ id: 'filterId', label: 'filterLabel'}] }], updateFilters: jest.fn};
    const result = shallow(<Filter {...props} />);
    expect(result).toMatchSnapshot();
});

