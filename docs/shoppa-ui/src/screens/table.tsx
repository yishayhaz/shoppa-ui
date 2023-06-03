import React from "react";
import { Table } from "@shoppa-ui/widgets/table";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { BiTrash } from "react-icons/bi";

export function TableScreen() {
  return (
    <div>
      <h1>This is the documentation for the table</h1>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
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
            <td>Row 2</td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>Row 3</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
