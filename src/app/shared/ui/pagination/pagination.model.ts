export const PageItemType = {
  PAGE: 'PAGE',
  ELLIPSIS: 'ELLIPSIS',
};

export type PageModel = {
  type: 'page' | 'ellipsis';
  value?: number; // 1, 2,3
  key: string;
};
