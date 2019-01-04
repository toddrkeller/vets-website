import React from 'react';
import AdditionalInfo from '@department-of-veterans-affairs/formation/AdditionalInfo';

export const unemployabilityTitle = (
  <legend className="schemaform-block-title schemaform-title-underline">
    Individual Unemployability
  </legend>
);

export const unemployabilityHelp = (
  <AdditionalInfo triggerText="How do I know if I‘m eligible?">
    <p>
      You may qualify for Individual Unemployability if you can‘t work because
      of a disability related to your service in the military (a
      service-connected disability).
    </p>
    <ul>
      To quality, both of these must be true:
      <li>
        You have at least 1 service-connected disability rated at 60% or more
        disabling, or 2 or more service-connected disabilities - with at least 1
        rated 40% or more disabling and a combined rating of 70% or more
      </li>
      <strong>and</strong>
      <li>
        You can‘t hold down a steady job that supports you financially (known as
        substantially gainful employment) because of your service-connected
        disability. Odd jobs (marginal employment), aren't disqualifying.
      </li>
      <p>
        <strong>Note:</strong> in certain cases - for example, if you need to be
        in the hospital often - you may qualify at lower disability rating.
      </p>
    </ul>
  </AdditionalInfo>
);

export const introDescription = (
  <div>
    <p>
      Equal to VA Form 21-8940 (Veteran’s Application for Increased Compensation
      Based on Unemployability).
      <br />
    </p>
    <p>Filing a claim for Individual Unemployability is a two-part process:</p>
    <div className="process schemaform-process">
      <ol>
        <li className="process-step list-one">
          <div>
            <h5>Answer Questions</h5>
            <p>
              First, we'll ask you questions about your situation and how your
              service-connected disability prevents you from holding down a
              steady job. You can either answer the questions online and provide
              supporting documents. Or if you‘ve already completed a Veteran‘s
              Application for Increased Compensation Based on Unemployability
              (VA Form 21-8940), you can upload the form. If you choose to
              answer
            </p>
          </div>
        </li>
        <li className="process-step list-two">
          <div>
            <h5>Submit Employer Form</h5>
            <p>
              Then, we’ll ask you to send each of your former employers a form
              for them to fill out verifying your past work. You’ll be able to
              download a Request for Employment Information (VA Form 21-4192)
              later in the application. If you don’t want to do this step
              yourself, we could request this information from your employer for
              you, but that may delay the processing of your claim.
            </p>
          </div>
        </li>
      </ol>
    </div>
  </div>
);
