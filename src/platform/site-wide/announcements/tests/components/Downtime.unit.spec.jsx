// Dependencies.
import React from 'react';
import { add } from 'date-fns';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
// Relative imports.
import Downtime from '../../components/Downtime';

describe('Downtime Messaging <Downtime />', () => {
  it('should render', () => {
    // Derive props.
    const expiresAt = add(Date.now(), { hours: 1, minutes: 30 });
    const dismiss = sinon.stub();
    const props = {
      announcement: { expiresAt },
      dismiss,
    };

    // Shallow render the component.
    const wrapper = shallow(<Downtime {...props} />);

    // Find the component.
    const promoBannerComponent = wrapper.find('PromoBanner');

    // Call `dismiss` props.
    promoBannerComponent.props().onClose();

    // Test `dismiss` prop.
    expect(dismiss.called).to.be.true;

    wrapper.unmount();
  });
});
