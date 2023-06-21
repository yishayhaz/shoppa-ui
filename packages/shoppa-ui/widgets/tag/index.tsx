import styles from "./style.module.scss";
import { BaseButton } from "../../primitives/base-button";

export type TagProps = {
  /** The content of the badge. */
  title: string | number;
  /** The color of the badge. */
  variant?: TagVariants;
  /** Add custom className to the badge */
  className?: string;
  /** The size of the badge. */
  size?: TagSizes;
  /** onClick X */
  onClick?: () => void;
};

export type TagSizes = "sm" | "md" | "lg";

export type TagVariants =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning";

export function Tag({
  title,
  size = "md",
  className,
  onClick,
  variant = "primary",
}: TagProps) {
  return (
    <div
      className={`${styles.tag} ${className || ""}`}
      data-size={size}
      data-variant={variant}
    >
      <span>{title}</span>
      <BaseButton onClick={onClick}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
        </svg>
      </BaseButton>
    </div>
  );
}
