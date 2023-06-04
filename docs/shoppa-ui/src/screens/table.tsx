import React from "react";
import { HeadCell, Table } from "@shoppa-ui/widgets/table";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { BiTrash } from "react-icons/bi";

export function TableScreen() {
  const [sortDir, setSortDir] = React.useState<1 | -1 | 0>(0);
  const [sortCol, setSortCol] = React.useState(0);

  return (
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
          <tr>
            <td>Row 1</td>
            <td>Row 1</td>
            <td>
              <IconButton label="trash" size="sm" variant="danger">
                <BiTrash />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td>Row 2</td>
            <td>Row 2</td>
            <td>
              <IconButton label="trash" size="sm" variant="danger">
                <BiTrash />
              </IconButton>
            </td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>
              <IconButton label="trash" size="sm" variant="danger">
                <BiTrash />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
