import RecNrnMorphologyCollection  from '../RecNrnMorphologyCollection';
import React from "react";
import { shallow } from "enzyme";



it('RecNrnMorphologyCollection renders correctly', () => {
    const divElement = React.createRef<HTMLDivElement>();
    const props = {
        resource: {
          reconstructedcells: [{
            id: "id",
            self: "self",
            name: "name",
            description: "description"
          }],
        }
      };


    const result = shallow(<RecNrnMorphologyCollection {...props} />);
    expect(result).toMatchSnapshot();
});