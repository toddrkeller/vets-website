import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';

import { DefinitionTester } from '../../../../../platform/testing/unit/schemaform-utils.jsx';

import formConfig from '../../../0994/config/form.js';
import HighTechEmploymentTypeView from '../../../../edu-benefits/0994/components/HighTechEmploymentTypeView';

describe('High tech industry page', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.highTechWorkExp.pages.highTechIndustry;

  it('renders the work experience page', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        data={{}}
        uiSchema={uiSchema}
        formData={{}}
      />,
    );

    expect(form.find('input').length).to.equal(2);

    form.unmount();
  });

  it('fails to submit when no answer selected', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{}}
        formData={{}}
        onSubmit={onSubmit}
      />,
    );
    form.find('form').simulate('submit');

    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('renders radio and checkbox group when yes selected', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          currentHighTechnologyEmployment: true,
        }}
        formData={{}}
      />,
    );

    expect(form.find('input').length).to.equal(13);
    form.unmount();
  });

  it('renders second question when no selected', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          currentHighTechnologyEmployment: false,
        }}
        formData={{}}
      />,
    );

    expect(form.find('input').length).to.equal(4);
    form.unmount();
  });

  it('fails to submit when no answer selected with the second question', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          currentHighTechnologyEmployment: false,
        }}
        formData={{}}
        onSubmit={onSubmit}
      />,
    );
    form.find('form').simulate('submit');

    expect(form.find('.usa-input-error-message').length).to.equal(1);
    expect(onSubmit.called).to.be.false;
    form.unmount();
  });

  it('renders radio and checkbox group when yes selected on second question', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          currentHighTechnologyEmployment: false,
          pastHighTechnologyEmployment: true,
        }}
        formData={{}}
      />,
    );

    expect(form.find('input').length).to.equal(15);
    form.unmount();
  });

  it('successfully submits when required questions answered', () => {
    const onSubmit = sinon.spy();
    const form = mount(
      <DefinitionTester
        definitions={formConfig.defaultDefinitions}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          currentHighTechnologyEmployment: false,
          pastHighTechnologyEmployment: false,
        }}
        formData={{}}
        onSubmit={onSubmit}
      />,
    );

    form.find('form').simulate('submit');

    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
    form.unmount();
  });

  const highTechnologyEmploymentTypes = {
    computerProgramming:
      'input#computerProgramming[name="computerProgramming"]',
    computerSoftware: 'input#computerSoftware[name="computerSoftware"]',
    dataProcessing: 'input#dataProcessing[name="dataProcessing"]',
    informationSciences:
      'input#informationSciences[name="informationSciences"]',
    mediaApplication: 'input#mediaApplication[name="mediaApplication"]',
    noneApply: 'input#noneApply[name="noneApply"]',
  };

  const getCheckboxes = form => {
    const checkboxes = {
      computerProgramming: _.get(
        form,
        'input[name*="computerProgramming"]',
        false,
      ),
      computerSoftware: _.get(form, 'input[name*="computerSoftware"]', false),
      dataProcessing: _.get(form, 'input[name*="dataProcessing"]', false),
      informationSciences: _.get(
        form,
        'input[name*="informationSciences"]',
        false,
      ),
      mediaApplication: _.get(form, 'input[name*="mediaApplication"]', false),
      noneApply: _.get(form, 'input[name*="noneApply"]', false),
    };
    return checkboxes;
  };

  it('all checkboxes checked then noneApply checked causes all other checkboxes to be cleared', () => {
    const handleChange = sinon.spy();
    const form = mount(
      <HighTechEmploymentTypeView
        formData={{
          computerProgramming: true,
          computerSoftware: true,
          dataProcessing: true,
          informationSciences: true,
          mediaApplication: true,
          noneApply: false,
        }}
        onChange={handleChange}
      />,
    );

    const checkboxes = getCheckboxes(form);

    form.find(highTechnologyEmploymentTypes.noneApply).simulate('change', {
      id: 'noneApply',
      checked: true,
    });

    expect(checkboxes.computerProgramming).to.equal(false);
    expect(checkboxes.dataProcessing).to.equal(false);
    expect(checkboxes.computerSoftware).to.equal(false);
    expect(checkboxes.informationSciences).to.equal(false);
    expect(checkboxes.mediaApplication).to.equal(false);

    form.unmount();
  });

  it('noneApply checkbox checked then any other checked causes noneApply checkbox to be cleared', () => {
    const handleChange = sinon.spy();
    const form = mount(
      <HighTechEmploymentTypeView
        formData={{
          computerProgramming: false,
          computerSoftware: false,
          dataProcessing: false,
          informationSciences: false,
          mediaApplication: false,
          noneApply: true,
        }}
        onChange={handleChange}
      />,
    );

    const checkboxes = getCheckboxes(form);

    form
      .find(highTechnologyEmploymentTypes.computerProgramming)
      .simulate('change', {
        id: 'computerProgramming',
        checked: true,
      });

    expect(checkboxes.noneApply).to.equal(false);

    form.unmount();
  });
});
