export type PaginationButtonLabels = {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
};

export type PaginationOptions = {
  boundaryCount?: number;
  siblingCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  hideFirstButton?: boolean;
  hideLastButton?: boolean;
  activeClass?: string;
  defaultClass?: string;
  labels?: PaginationButtonLabels;
};

export type PaginationButtonValue =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "divider"
  | "start-ellipsis"
  | "end-ellipsis"
  | number
  | string;

export type UsePagination = (
  page: number,
  count: number,
  options?: PaginationOptions
) => PaginationButtonValue[];

export const usePagination: UsePagination = (
  page,
  count,
  {
    boundaryCount = 1,
    siblingCount = 1,
    hidePrevButton,
    hideNextButton,
    hideFirstButton,
    hideLastButton,
  } = {}
) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));

  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount, // natural start
      count - boundaryCount - siblingCount * 2 - 1 // lower boundary when page is high
    ),
    boundaryCount + 2 // greater than startPages
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + siblingCount, // natural end
      boundaryCount + siblingCount * 2 + 2 // upper boundary when page is low
    ),
    endPages.length > 0 ? endPages[0] - 2 : count - 1 // less than endPages
  );

  const items = [
    ...(hideFirstButton || page === 0 ? [] : ["first"]),
    ...(hidePrevButton ? [] : ["prev"]),
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ["divider"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    ...range(siblingsStart, siblingsEnd),

    ...(siblingsEnd < count - boundaryCount - 1
      ? ["divider"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ["next"]),
    ...(hideLastButton || page === count ? [] : ["last"]),
  ];

  return items;
};
