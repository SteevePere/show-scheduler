import React from 'react';
import { truncateText } from 'utils/truncate-text.util';

class UseTruncateData {
  text: string | null; 
  isFullText: boolean;
  maxLength: number;
}
  
export function useTruncatedText(data: UseTruncateData) {
  const { text, isFullText, maxLength } = data;
    
  return React.useMemo(() => {
    return (!text || isFullText) ? text
      : truncateText({ text, maxLength });
  }, [text]);
}