import { BaseCard, BaseCardProps } from "../../primitives/base-card";

export type CardProps = BaseCardProps & {
  roundness?: CardRoundness;
  padding?: number;
};

export type CardRoundness = "sm" | "md" | "lg";

export function Card({
  className,
  roundness = "md",
  padding,
  ...rest
}: CardProps) {
  return (
    <BaseCard
      className={`${className || ""} ${
        roundness === "md" ? "rounded" : `rounded-${roundness}`
      } ${padding === 0 ? "" : `p-${padding || 20}`}`}
      {...rest}
    />
  );
}
