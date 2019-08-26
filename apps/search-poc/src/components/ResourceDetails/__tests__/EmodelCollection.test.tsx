import EModelCollectionDetails  from '../EModelCollection';
import React from "react";
import { shallow } from "enzyme";



it('EModelCollectionDetails renders correctly', () => {
    const props = {
        resource: {
            emodels: [{
                id: "id",
                self: "self_url",
                name: "name",
                description: "description"
            }]
        }
    };


    // const result = shallow(<EModelDetails {...props} />);
    const result = shallow(<EModelCollectionDetails {...props} />);
    expect(result).toMatchSnapshot();
});