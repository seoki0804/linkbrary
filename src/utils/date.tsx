import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale';

/** '방금 전', '3분 전', '2개월 전', '1년 전'처럼 지금으로부터 얼마나 지났는지 한국어로 돌려준다. */
export const formatUpdatedAt = (dateInput: string | Date) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (Date.now() - date.getTime() < 60_000) return '방금 전';
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
};
