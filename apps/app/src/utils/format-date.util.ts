import { DateTime } from 'luxon';

class FormatDateData {
  date: string | Date | null | undefined;
  format: string;
};

export function formatDate(data: FormatDateData): string {
  const { date, format } = data;
  if (!!date && typeof date === 'string') {
    return DateTime.fromISO(date).toFormat(format);
  }
  else if (!!date && typeof date === 'object') {
    return DateTime.fromJSDate(date).toFormat(format);
  }
  return '';
};