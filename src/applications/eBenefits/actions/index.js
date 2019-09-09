import { getData } from '../util';

export const FETCH_PERSONAL_INFORMATION_SUCESS =
  'FETCH_PERSONAL_INFORMATION_SUCESS';

export function fetchPersonalInformation() {
  return async dispatch => {
    dispatch({
      type: FETCH_PERSONAL_INFORMATION_SUCESS,
      personalInformation: await getData('/profile/personal_information'),
    });
  };
}
