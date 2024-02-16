class TruncateTextData {
  text: string;
  maxLength: number;
};

export function truncateText(data: TruncateTextData): string {
  const {text, maxLength} = data;
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text;
};