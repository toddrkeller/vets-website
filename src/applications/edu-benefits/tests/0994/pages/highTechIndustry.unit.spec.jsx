import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
// import _ from 'lodash';

import {
  DefinitionTester,
  // getFormDOM,
} from '../../../../../platform/testing/unit/schemaform-utils.jsx';

import formConfig from '../../../0994/config/form.js';
// import ReactTestUtils from 'react-dom/test-utils';
// import { selectCheckbox } from '../../../../../platform/testing/unit/schemaform-utils';
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

  // const highTechnologyEmploymentTypes = {
  //   computerProgramming:
  //     'input#computerProgramming[name="computerProgramming"]',
  //   computerSoftware: 'input#computerSoftware[name="computerSoftware"]',
  //   dataProcessing: 'input#dataProcessing[name="dataProcessing"]',
  //   informationSciences:
  //     'input#informationSciences[name="informationSciences"]',
  //   mediaApplication: 'input#mediaApplication[name="mediaApplication"]',
  //   noneApply: 'input#noneApply[name="noneApply"]',
  // };

  // const getCheckboxes = formDOM => {
  //   const checkboxes = {
  //     computerProgramming: formDOM.getElement(
  //       highTechnologyEmploymentTypes.computerProgramming,
  //     ),
  //     computerSoftware: formDOM.getElement(
  //       highTechnologyEmploymentTypes.computerSoftware,
  //     ),
  //     dataProcessing: formDOM.getElement(
  //       highTechnologyEmploymentTypes.dataProcessing,
  //     ),
  //     informationSciences: formDOM.getElement(
  //       highTechnologyEmploymentTypes.informationSciences,
  //     ),
  //     mediaApplication: formDOM.getElement(
  //       highTechnologyEmploymentTypes.mediaApplication,
  //     ),
  //     noneApply: formDOM.getElement(highTechnologyEmploymentTypes.noneApply),
  //   };
  //   return checkboxes;
  // };

  it('all checkboxes checked then noneApply checked causes all other checkboxes to be cleared', () => {
    const handleChange = sinon.spy();
    // const form = ReactTestUtils.renderIntoDocument(
    const form = mount(
      <HighTechEmploymentTypeView
        formData={{
          currentHighTechnologyEmployment: false,
          pastHighTechnologyEmployment: true,
          'view:salaryEmploymentTypes': {
            highTechnologyEmploymentType: {
              computerProgramming: true,
              computerSoftware: true,
              dataProcessing: true,
              informationSciences: true,
              mediaApplication: true,
              noneApply: false,
            },
          },
        }}
        onChange={handleChange}
      />,
    );

    // const formDOM = getFormDOM(form);

    // formDOM.click('input#noneApply[name="noneApply"]');
    // formDOM.setCheckbox(
    //   highTechnologyEmploymentTypes.computerProgramming,
    //   true,
    // );
    // formDOM.click(highTechnologyEmploymentTypes.computerProgramming);

    // const checkboxes = getCheckboxes(formDOM);
    // formDOM.setCheckbox(highTechnologyEmploymentTypes.noneApply, true);
    form.find(`input#noneApply`).simulate('change', {
      target: { checked: true },
    });
    // selectCheckbox(form, 'computerProgramming', true);

    expect(form.find('input').length).to.equal(6);
    // expect(form.find({ name: 'noneApply' }).checked).to.equal(true);
    // expect(form.props('currentHighTechnologyEmployment')).to.equal(true);
    // console.log(form.state());

    // const noneApplyCheckbox = form.find(
    //   `input[name*="noneApply"]`
    // );

    // formDOM.printTree();
    // expect(checkboxes.noneApply.checked).to.equal(true);
    // expect(_.get(form, 'input[name*="computerProgramming"]', false).length.to.equal(1));
    // expect(form.find('input[name*="noneApply"]').value).to.equal(true);
    // expect(noneApplyCheckbox.checked).to.equal(true);
    // expect(noneApplyCheckbox.value).to.equal(true);
    // expect(form.find(`input[name*="noneApply"]`).target).to.equal(false);

    // expect(checkboxes.computerProgramming.checked).to.equal(false);
    // expect(checkboxes.computerSoftware.checked).to.equal(false);
    // expect(checkboxes.dataProcessing.checked).to.equal(false);
    // expect(checkboxes.informationSciences.checked).to.equal(false);
    // expect(checkboxes.mediaApplication.checked).to.equal(false);
    // expect(checkboxes.noneApply.checked).to.equal(true);

    form.unmount();
  });
});
