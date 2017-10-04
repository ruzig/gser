import React from 'react';
import { shallow } from 'enzyme';
import { PureHome } from '../index';
import { Pagination } from '../Pagination';

describe('Home', () => {
	it('renders surprise', () => {
		const wrapper = shallow(<PureHome isEmptyUser={true} />);
		const surprise = <h3>We're planing a surprise</h3>;
		expect(wrapper).toContainReact(surprise)
	});

	it('renders list of users', () => {
		const wrapper = shallow(<PureHome isEmptyUser={false} />);
		const listUsers = <h3>Top devs in Singapore</h3>;
		expect(wrapper).toContainReact(listUsers)
	});
});
