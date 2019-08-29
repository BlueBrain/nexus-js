
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
      onLinkClick: jest.fn()
    };

    const result = shallow(<Link {...props}>Link</Link>, { context: contextProps });

    expect(result).toMatchSnapshot();
  });

  it('Renders # as href if buildHref is not provided', () => {
    const props = {
      params: { selfUrl: '123', type: 'resource' },
    }

    const contextProps = {
      onLinkClick: jest.fn(),
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
      onLinkClick: jest.fn(),
    };

    const linkNode = shallow(<Link {...props}>Link</Link>, { context: contextProps });
    expect(linkNode.find('a').prop('href')).toBe(buildHref(props.params));
  });

  it('Prevents event default and calls onLinkClick function on click', () => {
    const props = {
      params: { selfUrl: '123', type: 'resource' },
    };

    const contextProps = {
      onLinkClick: jest.fn(),
    };

    const preventDefault = jest.fn();

    const linkNode = shallow(<Link {...props}>Link</Link>, { context: contextProps });
    linkNode.find('a').simulate('click', { preventDefault });

    expect(preventDefault.mock.calls.length).toBe(1);
    expect(contextProps.onLinkClick.mock.calls.length).toBe(1);
    expect(contextProps.onLinkClick.mock.calls[0][0]).toBe(props.params);
  });
});
