import React from "react";
import { Combobox } from "@shoppa-ui/floating/combobox";
import { Card } from "@shoppa-ui/widgets/card";
import { BiSearch } from "react-icons/bi";

const DATA = [
  { name: "John", age: 21 },
  { name: "Jane", age: 22 },
  { name: "Joe", age: 23 },
  { name: "Jill", age: 24 },
  { name: "Jack", age: 25 },
  { name: "Mike", age: 26 },
  { name: "Mary", age: 27 },
  { name: "Molly", age: 28 },
  { name: "Morgan", age: 29 },
];

export function ComboxboxScreen() {
  const [data, setData] = React.useState(DATA);
  const [value, setValue] = React.useState(DATA[5]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInput = async (input: string) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setData(
        DATA.filter((item) => {
          return item.name.toLowerCase().includes(input.toLowerCase());
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>This is the documentation for the combobox component.</h1>
      <br />
      <Combobox
        items={data}
        accessor={"name"}
        onChange={(item, e) => {
          setValue(item);
        }}
        onInput={handleInput}
        // isLoading={isLoading}
        // btnIcon={<BiSearch />}
        value={value}
        noTyping
      />
      <br />
      <Card>
        <h1>Find Person</h1>
        <mark>Name</mark>: {value.name}
        <br />
        <mark>Age</mark>: {value.age}
      </Card>
      <br />
      <h2>With interntal query</h2>
      <Combobox items={DATA} accessor="name" internalQuery />
      <br />
      <Card>
        <h1>Find Person</h1>
        <mark>Name</mark>: {value.name}
        <br />
        <mark>Age</mark>: {value.age}
      </Card>
    </div>
  );
}
