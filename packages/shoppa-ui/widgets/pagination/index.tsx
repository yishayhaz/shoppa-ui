import { IconButton } from "../icon-button";
import { PaginationButtonValue, usePagination } from "./hook";

export type PaginationProps = {
  page: number;
  count: number;
  active?: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, count, active, onChange }: PaginationProps) {
  const pagination = usePagination(page, count, {});

  const getItemHTML = (item: PaginationButtonValue) => {
    switch (item) {
      case "next":
        return (
          <svg
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
        );
      case "prev":
        return (
          <svg
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
        );
      case "first":
        return (
          <svg
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
        );
      case "last":
        return (
          <svg
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
        );
      case "divider":
        return "...";
      case "start-ellipsis":
        return "...";
      case "end-ellipsis":
        return "...";
      default:
        return item;
    }
  };

  return (
    <div className="d-flex flex-wrap gap-6">
      {pagination.map((item, idx) => (
        <IconButton
          key={idx}
          label={item.toString()}
          variant={item === active ? "neutral" : "link"}
          onClick={() => {
            switch (item) {
              case "next":
                return onChange(page + 1);
              case "prev":
                return onChange(page - 1);
              case "first":
                return onChange(1);
              case "last":
                return onChange(count);
              default:
                if (typeof item === "number") {
                  return onChange(item);
                }
            }
          }}
        >
          {getItemHTML(item)}
        </IconButton>
      ))}
    </div>
  );
}
