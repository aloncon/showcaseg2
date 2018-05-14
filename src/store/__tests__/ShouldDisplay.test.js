import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ShouldDisplay from '../../system/codes/ShouldDisplay';

it('renders properly', () => {
    const rendered = shallow(<ShouldDisplay store={{ shouldDisplay: true }}>hello there</ShouldDisplay>);
    const output = toJson(rendered);
    expect(output).toMatchSnapshot();

    const rendered2 = shallow(<ShouldDisplay store={{ shouldDisplay: false }}>hello there</ShouldDisplay>);
    const output2 = toJson(rendered2);
    expect(output2).toMatchSnapshot();
});