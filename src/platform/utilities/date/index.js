import moment from 'moment';
import {
  differenceInSeconds,
  differenceInDays,
  formatDistanceStrict,
} from 'date-fns';

export function dateToMoment(dateField) {
  return moment({
    year: dateField.year.value,
    month: dateField.month.value ? parseInt(dateField.month.value, 10) - 1 : '',
    day: dateField.day ? dateField.day.value : null,
  });
}

export function formatDateLong(date) {
  return moment(date).format('MMMM DD, YYYY');
}

export function formatDateParsedZoneLong(date) {
  return moment.parseZone(date).format('MMMM DD, YYYY');
}

export function formatDateShort(date) {
  return moment(date).format('MM/DD/YYYY');
}

export function formatDateParsedZoneShort(date) {
  return moment.parseZone(date).format('MM/DD/YYYY');
}

/**
 * timeFromNow returns the number of days, hours, minutes, or seconds until
 * the provided date occurs. It’s meant to be less fuzzy than date-fn’s
 * formatDistanceToNow so it can be used for expiration dates
 *
 * @param date {Date} The future date to check against
 * @param userFromDate {Date} The earlier date in the range. Defaults to today.
 * @returns {string} The string description of how long until date occurs
 */
export function timeFromNow(date, userFromDate = null) {
  const now = userFromDate || Date.now();

  // The largest unit we want to show is days - don't treat anything as months/years
  if (differenceInDays(date, now) >= 29) {
    return formatDistanceStrict(date, now, { unit: 'day' });
  }

  // Don't round seconds up to minutes
  if (differenceInSeconds(date, now) < 60) {
    return formatDistanceStrict(date, now, { unit: 'second' });
  }

  return formatDistanceStrict(date, now);
}

/**
 * Checks if the passed-in arg is a valid date string, meaning it can be parsed
 * by Date.parse()
 *
 * @param {string} dateString The string to validate
 * @returns {boolean} If the string is a valid date string
 */
export function isValidDateString(dateString) {
  return !isNaN(Date.parse(dateString));
}

const monthIndices = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

const LONG_FORM_MONTHS = [
  monthIndices.MAR,
  monthIndices.APR,
  monthIndices.MAY,
  monthIndices.JUN,
  monthIndices.JUL,
];

/**
 * Formats the given date-time into a string that is intended for use in
 * downtime notifications
 *
 * @param {string} dateTime The date-time as a moment or string in Eastern time
 * @returns {string} The formatted date-time string
 */
export const formatDowntime = dateTime => {
  const dtMoment = moment.parseZone(dateTime);
  const dtHour = dtMoment.hour();
  const dtMinute = dtMoment.minute();

  const monthFormat = LONG_FORM_MONTHS.includes(dtMoment.month())
    ? 'MMMM'
    : 'MMM';

  let timeFormat;

  if (dtHour === 0 && dtMinute === 0) {
    timeFormat = '[midnight]';
  } else if (dtHour === 12 && dtMinute === 0) {
    timeFormat = '[noon]';
  } else {
    const amPmFormat = dtHour < 12 ? '[a.m.]' : '[p.m.]';
    timeFormat = `h:mm ${amPmFormat}`;
  }

  return dtMoment.format(`${monthFormat} D [at] ${timeFormat} [ET]`);
};
