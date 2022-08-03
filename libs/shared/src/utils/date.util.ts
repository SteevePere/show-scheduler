import { DateTime } from 'luxon';

export function fromJsDateToHumanReadable(date: Date): string {
  return DateTime.fromJSDate(date).toFormat(
    'cccc (dd/MM) - t',
  );
}