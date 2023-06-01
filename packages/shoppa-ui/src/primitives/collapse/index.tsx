import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

export type CollapseProps = {
  children: [React.ReactNode, React.ReactNode];
  /**
   * The first child is the head of the collapse
   * The second child is the body of the collapse
   */
  isOpen?: boolean;
  /**
   * `isOpen` declares weather the collapse is open or not
   * if `isOpen` is not passed, the collapse will be controlled internally
   */
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * `setIsOpen` is a function that sets the `isOpen` state
   * It is useful when you want to control the collapse from outside
   */
  defaultIsOpen?: boolean;
  /**
   * `defaultIsOpen` declares weather the collapse is open or not by default
   * Note that `isOpen` is stronger than `defaultIsOpen`
   */
  disabled?: boolean;
  /**
   * `disabled` declares weather the collapse is disabled or not
   * When disabled, the collapse cannot be opened or closed
   * Note that it still can be controlled from outside
   * @default false
   */
  headProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * `headProps` are the props that are passed to the head of the collapse
   * Note that usually you don't need to pass any props to the head
   */
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * `bodyProps` are the props that are passed to the body of the collapse
   * Note that usually you don't need to pass any props to the body
   */
} & React.HTMLAttributes<HTMLDivElement>;

export function Collapse({
  isOpen: isOpenProp,
  setIsOpen: setIsOpenProp,
  defaultIsOpen,
  disabled = false,
  children,
  headProps = {},
  bodyProps = {},
  ...rest
}: CollapseProps) {
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

  const handleHeadClick = () => {
    if (disabled) return;
    if (setIsOpenProp) {
      setIsOpenProp((prev) => !prev);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    setIsOpen(defaultIsOpen ?? isOpen);
  }, [defaultIsOpen]);

  return (
    <div
      {...rest}
      className={`${styles.collapse} ${rest.className || ""}`}
      aria-expanded={isOpenProp ?? isOpen}
      // it's intentional at the parent level, so it's easier to customize with it on other components
    >
      <div
        {...headProps}
        role={headProps.role || "tab"}
        onClick={handleHeadClick}
      >
        {children[0]}
      </div>
      <div {...bodyProps}>
        <div>{children[1]}</div>
      </div>
    </div>
  );
}
