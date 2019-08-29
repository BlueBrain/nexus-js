
import React from "react";

import Link from '../Link';
import { shallow } from "enzyme";


describe('Link component', () => {
  it("Renders correctly with props", () => {
    const props = {
      params: { selfUrl: '123', type: 'resource' },
    };

    const contextProps = {
      buildHref: jest.fn(),
      onResourceClick: jest.fn()
    };

    const result = shallow(<Link {...props}>Link</Link>, { context: contextProps });

    expect(result).toMatchSnapshot();
  });

  it('Renders # as href if buildHref is not provided', () => {
    const props = {
      params: { selfUrl: '123', type: 'resource' },
    }

    const contextProps = {
      onResourceClick: jest.fn(),
    };

    const linkNode = shallow(<Link {...props}>Link</Link>, { context: contextProps });
    expect(linkNode.find('a').prop('href')).toBe('#');
  });

  it('Renders correct href if buildHref is provided', () => {
    const props = {
      params: { selfUrl: '123', type: 'resource' },
    }

    const buildHref = params => `${params.type}/${params.selfUrl}`

    const contextProps = {
      buildHref,
      onResourceClick: jest.fn(),
    };

    const linkNode = shallow(<Link {...props}>Link</Link>, { context: contextProps });
    expect(linkNode.find('a').prop('href')).toBe(buildHref(props.params));
  });

  it('Calls onResourceClick function on click', () => {
    const props = {
      params: { selfUrl: '123', type: 'resource' },
    };

    const contextProps = {
      onResourceClick: jest.fn(),
    };

    const linkNode = shallow(<Link {...props}>Link</Link>, { context: contextProps });
    linkNode.find('a').simulate('click');

    expect(contextProps.onResourceClick.mock.calls.length).toBe(1);
    expect(contextProps.onResourceClick.mock.calls[0][0]).toBe(props.params);
  });
});
