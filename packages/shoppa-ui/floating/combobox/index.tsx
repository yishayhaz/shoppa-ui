import React, { useEffect, useMemo, useState } from "react";
import { InputProps, Input } from "../../widgets/input";
import { useFloating, useFloatingFocusWithin } from "../core/hook";
import { BaseFloating } from "../core/index";
import { BaseButton } from "../../primitives/base-button";
import styles from "./style.module.scss";

export type ComboboxProps<T extends object, K extends keyof T> = {
  items: T[];
  /**
   * @description
   * The items to be presented in the dropdown.
   */

  onInput?: (value: string) => void;
  /**
   * @description
   * When the value of the input changes.
   */
  onChange?: (value: T, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  /**
   * @description
   * When the user chooses an item.
   */
  internalQuery?: boolean;
  value?: T;
  accessor: K;
  /**
   * @description
   * The key to be used to access the label of the item.
   * @default
   * "value"
   */
  renderItem?: (item: T) => React.ReactNode;
  noTyping?: boolean;
  /**
   * @description
   * If true, the user can't type in the input.
   * @default
   * false
   */
} & Omit<InputProps, "value" | "onChange" | "onInput">;

export function Combobox<T extends object, K extends keyof T>({
  items,
  onInput,
  onChange,
  accessor,
  renderItem,
  value,
  noTyping,
  internalQuery,
  ...rest
}: ComboboxProps<T, K>) {
  const { refs, isVisible, setIsVisible } = useFloating({
    placement: "bottom",
    allowedPlacements: ["bottom", "top"],
    fullWidth: true,
  });
  useFloatingFocusWithin(refs.containerRef, setIsVisible);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (
    item: T,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (onChange) {
      onChange(item, e);
    }

    setInputValue(item[accessor]);
    setIsVisible(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (noTyping) return;

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

  const renderItems = useMemo(() => {
    if (!internalQuery) return items;

    return items.filter((item) => {
      const itemValue = String(item[accessor]).toLowerCase();
      const queryValue = String(inputValue).toLowerCase();

      return itemValue.includes(queryValue);
    });
  }, [items, internalQuery, inputValue, accessor]);

  return (
    <div className={styles.combobox} ref={refs.containerRef}>
      <Input
        type="select"
        value={inputValue}
        onChange={handleInput}
        autoComplete="off"
        {...rest}
      />
      {isVisible && items.length && !rest.disabled ? (
        <BaseFloating
          className={styles.combobox__dropdown}
          floatingRef={refs.floatingRef}
        >
          <ul>
            {renderItems.map((item, idx) => (
              <li key={idx} onClick={(e) => handleChange(item, e)}>
                <BaseButton data-active={item[accessor] === value?.[accessor]}>
                  {renderItem ? renderItem(item) : item[accessor]}
                </BaseButton>
              </li>
            ))}
          </ul>
        </BaseFloating>
      ) : null}
    </div>
  );
}
