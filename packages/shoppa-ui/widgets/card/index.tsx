import React from "react";
import { BaseCard, BaseCardProps } from "../../primitives/base-card";

export type CardProps = BaseCardProps & {
  roundness?: CardRoundness;
};

export type CardRoundness = "sm" | "lg";

export function Card({ className, roundness, ...rest }: CardProps) {
  return (
    <BaseCard
      className={`${className || ""} ${
        roundness ? `rounded-${roundness}` : "rounded"
      } p-20`}
      {...rest}
    />
  );
}
