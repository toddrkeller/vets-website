import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';
import sinon from 'sinon';

import TargetCheckboxWidget from '../../../0994/components/TargetCheckboxWidget';

describe('Schemaform <TargetCheckboxWidget>', () => {
  it('should render', () => {
    const onChange = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TargetCheckboxWidget
        id="1"
        value
        required
        disabled={false}
        onChange={onChange}
        options={{ title: 'Title' }}
      />,
    );
    expect(tree.text()).to.include('Title');
    expect(tree.subTree('input').props.checked).to.be.true;
    expect(tree.everySubTree('.form-required-span')).not.to.be.empty;
  });
  it('should handle change', () => {
    const onChange = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <TargetCheckboxWidget
        id="1"
        value
        required
        disabled={false}
        onChange={onChange}
        options={{ title: 'Title' }}
      />,
    );
    tree.subTree('input').props.onChange({
      target: {
        checked: false,
      },
    });
    expect(onChange.calledOn()).to.be.true;
  });
});
