// Dependencies.
import React from 'react';
import { addHours, add, format } from 'date-fns';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
// Relative imports.
import PrePreDowntime from '../../components/PrePreDowntime';

describe('Downtime Messaging <PrePreDowntime />', () => {
  it('should render', () => {
    // Derive props.
    const downtimeStartsAt = addHours(Date.now(), 1);
    const downtimeExpiresAt = add(Date.now(), {
      hours: 1,
      minutes: 30,
    });
    const dismiss = sinon.stub();
    const props = {
      announcement: { downtimeStartsAt, downtimeExpiresAt },
      dismiss,
    };

    // Shallow render the component.
    const wrapper = shallow(<PrePreDowntime {...props} />);

    // Find the component.
    const promoBannerComponent = wrapper.find('PromoBanner');

    // Call `dismiss` props.
    promoBannerComponent.props().onClose();

    // Test `dismiss` prop.
    expect(dismiss.called).to.be.true;

    wrapper.unmount();
  });
});
