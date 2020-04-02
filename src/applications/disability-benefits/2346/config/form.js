import ReviewCardField from 'platform/forms-system/src/js/components/ReviewCardField';
import AddressViewField from 'platform/forms-system/src/js/components/AddressViewField';
import { VA_FORM_IDS } from 'platform/forms/constants';
import fullSchemaMDOT from '../2346-schema.json';
import personalInfoBox from '../components/personalInfoBox';
import { schemaFields } from '../constants';
import ConfirmationPage from '../containers/ConfirmationPage';
import IntroductionPage from '../containers/IntroductionPage';
import UIDefinitions from '../definitions/2346UI';
import {
  buildAddressSchema,
  addressUISchema,
} from '../../686c-674/config/address-schema';

const { email, address, yesOrNo, supplies } = fullSchemaMDOT.definitions;

const {
  permAddressField,
  tempAddressField,
  emailField,
  suppliesField,
  viewAddAccessoriesField,
  viewAddBatteriesField,
} = schemaFields;

// const { permanentAddress, temporaryAddress } = fullSchemaMDOT.properties;

const {
  emailUI,
  addAccessoriesUI,
  addBatteriesUI,
  batteriesUI,
  accessoriesUI,
} = UIDefinitions.sharedUISchemas;

const formChapters = {
  veteranInformation: 'Veteran Information',
  orderSupplies: 'Order your supplies',
};

const formPages = {
  personalDetails: 'Personal Details',
  address: 'Shipping Address',
  addBatteriesPage: 'Add batteries to your order',
  addAccessoriesPage: 'Add accessories to your order',
};

const addressSchema = buildAddressSchema(true);

const formConfig = {
  urlPrefix: '/',
  submitUrl: '/posts',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'va-2346a-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: VA_FORM_IDS.FORM_VA_2346A,
  version: 0,
  prefillEnabled: true,
  title: 'Order Hearing Aid Batteries and Accessories',
  subTitle: 'VA Form 2346A',
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  defaultDefinitions: {
    email,
    address,
    supplies,
    yesOrNo,
  },
  chapters: {
    veteranInformationChapter: {
      title: formChapters.veteranInformation,
      pages: {
        [formPages.personalDetails]: {
          path: 'veteran-information',
          title: formPages.personalDetails,
          uiSchema: {
            'ui:description': personalInfoBox,
          },
          schema: {
            type: 'object',
            properties: {},
          },
        },
        [formPages.address]: {
          path: 'veteran-information/addresses',
          title: formPages.address,
          uiSchema: {
            permanentAddressOption: {
              [permAddressField]: {
                ...addressUISchema(
                  true,
                  'permanentAddressOption.permanentAddress',
                  () => true,
                ),
                'ui:field': ReviewCardField,
                'ui:options': {
                  viewComponent: AddressViewField,
                },
              },
              useThisAddress: {
                'ui:title': 'Ship to this address',
              },
            },
            temporaryAddressOption: {
              [tempAddressField]: {
                ...addressUISchema(
                  true,
                  'temporaryAddressOption.temporaryAddress',
                  () => true,
                ),
                'ui:field': ReviewCardField,
                'ui:options': {
                  viewComponent: AddressViewField,
                },
              },
              useThisAddress: {
                'ui:title': 'Ship to this address',
              },
            },
            [emailField]: emailUI,
          },
          schema: {
            type: 'object',
            properties: {
              permanentAddressOption: {
                type: 'object',
                properties: {
                  permanentAddress: addressSchema,
                  useThisAddress: {
                    type: 'boolean',
                  },
                },
              },
              temporaryAddressOption: {
                type: 'object',
                properties: {
                  temporaryAddress: addressSchema,
                  useThisAddress: {
                    type: 'boolean',
                  },
                },
              },
              email,
            },
          },
        },
      },
    },
    orderSuppliesChapter: {
      title: formChapters.orderSupplies,
      pages: {
        [formPages.addBatteriesPage]: {
          path: 'batteries',
          title: formPages.addBatteriesPage,
          schema: {
            type: 'object',
            properties: {
              [viewAddBatteriesField]: {
                type: 'string',
                enum: ['yes', 'no'],
              },
              supplies,
            },
          },
          uiSchema: {
            [viewAddBatteriesField]: addBatteriesUI,
            [suppliesField]: batteriesUI,
          },
        },
        [formPages.addAccessoriesPage]: {
          path: 'accessories',
          title: formPages.addAccessoriesPage,
          schema: {
            type: 'object',
            properties: {
              [viewAddAccessoriesField]: {
                type: 'string',
                enum: ['yes', 'no'],
              },
              supplies,
            },
          },
          uiSchema: {
            [viewAddAccessoriesField]: addAccessoriesUI,
            [suppliesField]: accessoriesUI,
          },
        },
      },
    },
  },
};
export default formConfig;
