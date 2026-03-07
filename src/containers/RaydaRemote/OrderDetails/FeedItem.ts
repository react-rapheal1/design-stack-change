/* eslint-disable */
// @ts-nocheck
interface FeedItem {
  id: string;
  type: string;
  initials: string;
  title: string;
  time: string;
  description?: string;
  highlight?: string | null;
  description2?: string;
  badge?: { label: string; style: string };
  action?: string;
  message?: string;
  attachment?: { name: string; size: string };
  isLast?: boolean;
}
export { FeedItem };
