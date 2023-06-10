import { IconButton } from "../icon-button";
import { PaginationButtonValue, usePagination } from "./hook";
import { isRtl } from "shoppa-utils/window";

export type PaginationProps = {
  page: number;
  count: number;
  onChange: (page: number) => void;
};

export type PaginationButtonProps = {
  item: PaginationButtonValue;
  onClick: (page: number) => void;
  page: number;
  count: number;
};

export function Pagination({ page, count, onChange }: PaginationProps) {
  const pagination = usePagination(page, count, {});

  return (
    <div className="d-flex flex-wrap gap-6">
      {pagination.map((item, idx) => (
        <PaginationButton
          key={idx}
          item={item}
          onClick={onChange}
          page={page}
          count={count}
        />
      ))}
    </div>
  );
}

const PaginationButton = ({
  item,
  onClick,
  page,
  count,
}: PaginationButtonProps) => {
  const shouldRotate = isRtl();

  if (item === "next") {
    return (
      <IconButton
        label="next page"
        variant="link"
        onClick={() => onClick(page + 1)}
        disabled={page === count}
      >
        <svg
          style={{
            ...(shouldRotate ? { transform: "rotate(180deg)" } : {}),
          }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </IconButton>
    );
  }

  if (item === "prev") {
    return (
      <IconButton
        label="previous page"
        variant="link"
        onClick={() => onClick(page - 1)}
        disabled={page === 1}
      >
        <svg
          style={{
            ...(shouldRotate ? { transform: "rotate(180deg)" } : {}),
          }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
        </svg>
      </IconButton>
    );
  }

  if (item === "first") {
    return (
      <IconButton
        label="first page"
        variant="link"
        onClick={() => onClick(1)}
        disabled={page === 1}
      >
        <svg
          style={{
            ...(shouldRotate ? { transform: "rotate(180deg)" } : {}),
          }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"></path>
          <path d="M11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path>
        </svg>
      </IconButton>
    );
  }

  if (item === "last") {
    return (
      <IconButton
        label="last page"
        variant="link"
        onClick={() => onClick(count)}
        disabled={page === count}
      >
        <svg
          style={{
            ...(shouldRotate ? { transform: "rotate(180deg)" } : {}),
          }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
          <path d="M13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
        </svg>
      </IconButton>
    );
  }

  if (typeof item === "number") {
    return (
      <IconButton
        label={`page ${item}`}
        variant={item === page ? "neutral" : "link"}
        onClick={() => onClick(item)}
      >
        {item}
      </IconButton>
    );
  }

  return <span>...</span>;
};
