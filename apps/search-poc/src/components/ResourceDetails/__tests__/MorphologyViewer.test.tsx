import MorphologyViewer  from '../MorphologyViewer';
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';


it('MorphologyViewer renders correctly', () => {
    const divElement = React.createRef<HTMLDivElement>();
    const props = {
        loading: true,
        error: null,
        stage: 'stage',
        morphology: 'morphology',
        ref: divElement,
      };


    const result = shallow(<MorphologyViewer {...props} />);
    expect(result).toMatchSnapshot();
});