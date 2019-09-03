import * as renderer from "react-test-renderer";
import Header from '../Header';
import React from "react";
import { shallow, mount } from "enzyme";


it("Header renders correctly", () => {
  const props = {
        handleLogin: jest.fn,
        handleLogout: jest.fn,
        userName: 'test',
        realms: [],
        Logout: () => {},
        Login: jest.fn()
    };

  const result = shallow(<Header {...props} />);
  expect(result).toMatchSnapshot();
});


