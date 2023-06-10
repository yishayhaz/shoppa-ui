import React, { useEffect } from "react";
import { HeadCell, Table } from "@shoppa-ui/widgets/table";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { BiTrash } from "react-icons/bi";
import { usePagination } from "@shoppa-hooks/pagination";
import { Pagination } from "@shoppa-ui/widgets/pagination";
import { Dialog } from "@shoppa-ui/widgets/dialog";

export function TableScreen() {
  const api = usePagination(async ({ page, amount }, name: string) => {
    const _page = (page - 1) * 3;
    const data = [_page, _page + 1, _page + 2];

    return { data, count: 0 };
  });

  const [sortDir, setSortDir] = React.useState<1 | -1 | 0>(0);
  const [sortCol, setSortCol] = React.useState(0);
  const [delCol, setDelCol] = React.useState<false | number>(false);

  useEffect(() => {
    api.fire("");
  }, []);

  return (
    <>
      {delCol !== false && (
        <Dialog
          text={`Are you sure to delete column ${delCol}?`}
          show
          onHide={() => {
            setDelCol(false);
          }}
          isDanger
        />
      )}
      <div>
        <h1>This is the documentation for the table</h1>
        <br />
        <Table>
          <thead>
            <tr>
              <HeadCell
                sortDir={sortCol === 0 ? sortDir : 0}
                onClick={() => {
                  setSortCol(0);
                  if (sortDir === 1) {
                    setSortDir(-1);
                  } else {
                    setSortDir(1);
                  }
                }}
              >
                Column 1
              </HeadCell>
              <HeadCell
                sortDir={sortCol === 1 ? sortDir : 0}
                onClick={() => {
                  setSortCol(1);
                  if (sortDir === 1) {
                    setSortDir(-1);
                  } else {
                    setSortDir(1);
                  }
                }}
              >
                Column 2
              </HeadCell>
              <HeadCell
                sortDir={sortCol === 2 ? sortDir : 0}
                onClick={() => {
                  setSortCol(2);
                  if (sortDir === 1) {
                    setSortDir(-1);
                  } else {
                    setSortDir(1);
                  }
                }}
              >
                Column 3
              </HeadCell>
            </tr>
          </thead>
          <tbody>
            {api.data?.data.map((i, idx) => (
              <tr key={idx}>
                <td>Row {i}</td>
                <td>Row {i}</td>
                <td>
                  <IconButton
                    label="trash"
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setDelCol(i);
                    }}
                  >
                    <BiTrash />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          page={api.page}
          count={100}
          onChange={(page) => api.setPage(page)("")}
        />
      </div>
    </>
  );
}
