import React, { useEffect, useState } from "react";
import { InputProps, Input } from "../../widgets/input";
import styles from "./style.module.scss";
import { useFloating, useFloatingFocusWithin } from "../core/hook";
import { BaseFloating } from "../core/index";
import { BaseButton } from "../../primitives/base-button";

export type ComboboxProps<T extends string> = {
  items: ComboboxItem<T>[];
  /**
   * @description
   * The items to be presented in the dropdown.
   */

  onInput?: (value: string) => void;
  /**
   * @description
   * When the value of the input changes.
   */
  onChange?: (
    value: ComboboxItem<T>,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  /**
   * @description
   * When the user chooses an item.
   */
  value?: ComboboxItem<T>;
  accessor: T;
  /**
   * @description
   * The key to be used to access the label of the item.
   * @default
   * "value"
   */
} & Omit<InputProps, "value" | "onChange" | "onInput">;

export type ComboboxItem<T extends string> = {
  [key in T]: string;
} & {
  [key: string]: any;
};

export function Combobox<T extends string>({
  items,
  onInput,
  onChange,
  accessor,
  value,
  ...rest
}: ComboboxProps<T>) {
  const { refs, isVisible, setIsVisible } = useFloating({
    placement: "bottom",
    allowedPlacements: ["bottom", "top"],
    fullWidth: true,
  });
  useFloatingFocusWithin(refs.containerRef, setIsVisible);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (
    item: ComboboxItem<T>,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (onChange) {
      onChange(item, e);
    }

    setInputValue(item[accessor]);
    setIsVisible(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e.target.value);
    }

    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (typeof value?.[accessor] === "string") {
      setInputValue(value[accessor]);
    }
  }, [value, accessor]);

  return (
    <div className={styles.combobox} ref={refs.containerRef}>
      <Input
        type="select"
        value={inputValue}
        onChange={handleInput}
        autoComplete="off"
        {...rest}
      />
      {isVisible && items.length ? (
        <BaseFloating
          className={styles.combobox__dropdown}
          floatingRef={refs.floatingRef}
        >
          <ul>
            {items.map((item, idx) => (
              <li key={idx} onClick={(e) => handleChange(item, e)}>
                <BaseButton data-active={item[accessor] === value?.[accessor]}>
                  {item[accessor]}
                </BaseButton>
              </li>
            ))}
          </ul>
        </BaseFloating>
      ) : null}
    </div>
  );
}
