import * as renderer from "react-test-renderer";
import ErrorBoundary from '../ErrorBoundary';
import React from "react";
import { mount } from "enzyme";

const MockComponent = () => null;
it('should display an ErrorMessage if wrapped component throws', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <MockComponent />
      </ErrorBoundary>
    );

    const error = new Error('test');

    wrapper.find(MockComponent).simulateError(error);

    expect(wrapper).toMatchSnapshot();
});