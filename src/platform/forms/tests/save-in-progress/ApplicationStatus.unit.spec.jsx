import React from 'react';
import { addDays, format, getUnixTime, subDays } from 'date-fns';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';

import { VA_FORM_IDS } from 'platform/forms/constants';

import { ApplicationStatus } from '../../save-in-progress/ApplicationStatus';

describe('schemaform <ApplicationStatus>', () => {
  it('should render loading', () => {
    const tree = SkinDeep.shallowRender(
      <ApplicationStatus
        formId="21P-527EZ"
        login={{}}
        profile={{
          loading: true,
        }}
      />,
    );

    expect(tree.subTree('LoadingIndicator')).to.not.be.false;
  });
  it('should render apply button', () => {
    const tree = SkinDeep.shallowRender(
      <ApplicationStatus
        formId="21P-527EZ"
        login={{
          currentlyLoggedIn: false,
        }}
        showApplyButton
        applyText="Apply for benefit"
        profile={{
          loading: false,
          savedForms: [],
        }}
      />,
    );

    expect(tree.subTree('.usa-button-primary').text()).to.equal(
      'Apply for benefit',
    );
  });
  it('should render saved form', () => {
    const lastUpdated = getUnixTime(Date.now());
    const lastUpdatedString = format(lastUpdated, "M/d/yyyy 'at' h:mm a");
    const expiresAt = getUnixTime(addDays(Date.now(), 1));

    const tree = SkinDeep.shallowRender(
      <ApplicationStatus
        formId="21P-527EZ"
        login={{
          currentlyLoggedIn: true,
        }}
        showApplyButton
        applyText="Apply for benefit"
        profile={{
          loading: false,
          savedForms: [
            {
              form: VA_FORM_IDS.FORM_21P_527EZ,
              metadata: {
                expiresAt,
                lastUpdated,
              },
            },
          ],
        }}
      />,
    );

    expect(tree.subTree('.usa-alert-info')).to.not.be.false;
    expect(tree.subTree('.usa-button-primary').text()).to.equal(
      'Continue your application',
    );
    expect(tree.subTree('.form-title').text()).to.contain(
      'Your form is in progress',
    );
    expect(tree.everySubTree('.saved-form-item-metadata')[1].text()).to.equal(
      `Your application was last saved on ${lastUpdatedString}`,
    );
    expect(tree.subTree('.expires').text()).to.equal(
      `will expire on ${format(expiresAt, 'M/d/yyyy')}.`,
    );
  });
  it('should render expired form', () => {
    const tree = SkinDeep.shallowRender(
      <ApplicationStatus
        formId="21P-527EZ"
        login={{
          currentlyLoggedIn: true,
        }}
        showApplyButton
        applyText="Apply for benefit"
        profile={{
          loading: false,
          savedForms: [
            {
              form: VA_FORM_IDS.FORM_21P_527EZ,
              metadata: {
                expiresAt: getUnixTime(subDays(Date.now(), 1)),
              },
            },
          ],
        }}
      />,
    );
    expect(tree.subTree('.usa-alert-warning')).to.not.be.false;
    expect(tree.subTree('.usa-button-primary').text()).to.equal(
      'Start a new application',
    );
  });
  it('should render saved form from ids', () => {
    const tree = SkinDeep.shallowRender(
      <ApplicationStatus
        formIds={new Set([VA_FORM_IDS.FORM_22_1990])}
        login={{
          currentlyLoggedIn: true,
        }}
        showApplyButton
        applyText="Apply for benefit"
        profile={{
          loading: false,
          savedForms: [
            {
              form: VA_FORM_IDS.FORM_22_1990,
              metadata: {
                expiresAt: getUnixTime(addDays(Date.now(), 1)),
                lastUpdated: getUnixTime(Date.now()),
              },
            },
          ],
        }}
      />,
    );

    expect(tree.subTree('.usa-alert-info')).to.not.be.false;
    expect(tree.subTree('.usa-button-primary').text()).to.equal(
      'Continue your application',
    );
    expect(tree.subTree('.form-title').text()).to.contain(
      'Your form is in progress',
    );
  });
  it('should render multiple forms message', () => {
    const tree = SkinDeep.shallowRender(
      <ApplicationStatus
        formIds={new Set([VA_FORM_IDS.FORM_22_1990, VA_FORM_IDS.FORM_22_1995])}
        login={{
          currentlyLoggedIn: true,
        }}
        showApplyButton
        applyText="Apply for benefit"
        profile={{
          loading: false,
          savedForms: [
            {
              form: VA_FORM_IDS.FORM_22_1990,
              metadata: {
                expiresAt: getUnixTime(addDays(Date.now(), 1)),
                lastUpdated: getUnixTime(Date.now()),
              },
            },
            {
              form: VA_FORM_IDS.FORM_22_1995,
              metadata: {
                expiresAt: getUnixTime(addDays(Date.now(), 1)),
              },
            },
          ],
        }}
      />,
    );

    expect(tree.subTree('.usa-alert-info')).to.not.be.false;
    expect(tree.subTree('.usa-alert-info').text()).to.contain(
      'more than one in-progress form',
    );
  });
});
