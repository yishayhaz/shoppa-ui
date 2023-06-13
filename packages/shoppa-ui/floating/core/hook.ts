import {
  computePosition,
  autoUpdate,
  autoPlacement,
  offset,
  shift,
} from "@floating-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Alignment = "start" | "end";
export type Side = "top" | "right" | "bottom" | "left";
export type AlignedPlacement = `${Side}-${Alignment}`;
export type Placement = Side | AlignedPlacement;

export type UseFloating = (...args: UseFloatingArgs) => UseFloatingReturn;

export type UseFloatingArgs = [UseFloatingOptions?, boolean?];

export type UseFloatingReturn = {
  refs: UseFloatingRefs;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UseFloatingRefs = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  floatingRef: React.MutableRefObject<HTMLDivElement | null>;
};

export type UseFloatingOptions = {
  fullWidth?: boolean;
  allowedPlacements?: Placement[];
  placement?: Placement;
  offset?: number;
  padding?: number;
  shiftOffset?: number;
};

const DEFAULT_OFFSET = 10;
const DEFAULT_PLACEMENT: Placement = "bottom";
const DEFAULT_ALLOWED_PLACEMENTS: Placement[] = [];

export const useFloating: UseFloating = (options, defaultVisible = false) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(defaultVisible);

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !floatingRef.current || !isVisible) return;

    computePosition(containerRef.current, floatingRef.current, {
      strategy: "fixed",
      placement: options?.placement || DEFAULT_PLACEMENT,
      middleware: [
        autoPlacement({
          allowedPlacements:
            options?.allowedPlacements || DEFAULT_ALLOWED_PLACEMENTS,
        }),
        shift({
          padding: options?.shiftOffset ?? DEFAULT_OFFSET,
        }),
        offset(options?.offset ?? DEFAULT_OFFSET),
      ],
    }).then(({ x, y }: { x: number; y: number }) => {
      if (!containerRef.current || !floatingRef.current || !isVisible) return;

      Object.assign(floatingRef.current.style, {
        left: `${x}px`,
        top: `${y}px`,
        ...(options?.fullWidth
          ? { width: `${containerRef.current.offsetWidth}px` }
          : {}),
      });
    });
  }, [isVisible, options]);

  useEffect(() => {
    if (!containerRef.current || !floatingRef.current || !isVisible) return;

    const cleanup = autoUpdate(
      containerRef.current,
      floatingRef.current,
      updatePosition
    );

    return cleanup;
  }, [isVisible, updatePosition]);

  return {
    refs: {
      containerRef,
      floatingRef,
    },
    isVisible,
    setIsVisible,
  };
};

//\\//\\//\\//\\//\\//
// USE INTERACTIONS //
//\\//\\//\\//\\//\\//

export type UseFloatingInteractionArgs = [
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
];

export type UseFloatingInteractionReturn = void;

export type UseFloatingHover = (
  ...args: [...UseFloatingInteractionArgs, boolean?]
) => UseFloatingInteractionReturn;
export type UseFloatingFocus = (
  ...args: [...UseFloatingInteractionArgs]
) => UseFloatingInteractionReturn;

export const useFloatingHover: UseFloatingHover = (
  containerRef,
  setIsVisible,
  disableMobile
) => {
  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener("mouseenter", onMouseEnter);
    containerRef.current.addEventListener("mouseleave", onMouseLeave);

    if (!disableMobile) {
      containerRef.current.addEventListener("touchstart", onMouseEnter);
      containerRef.current.addEventListener("touchend", onMouseLeave);
      containerRef.current.addEventListener("touchcancel", onMouseLeave);
    }

    return () => {
      containerRef.current?.removeEventListener("mouseenter", onMouseEnter);
      containerRef.current?.removeEventListener("mouseleave", onMouseLeave);

      if (!disableMobile) {
        containerRef.current?.removeEventListener("touchstart", onMouseEnter);
        containerRef.current?.removeEventListener("touchend", onMouseLeave);
        containerRef.current?.removeEventListener("touchcancel", onMouseLeave);
      }
    };
  }, [containerRef, setIsVisible, disableMobile, onMouseLeave, onMouseEnter]);
};

export const useFloatingFocus: UseFloatingFocus = (
  containerRef,
  setIsVisible
) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const target = e.target as HTMLElement;

      if (!containerRef.current.contains(target)) {
        setIsVisible(false);
        return;
      }

      if (target.dataset.close === "true") {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
    },
    [containerRef, setIsVisible]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [containerRef, setIsVisible, handleClick]);
};

export const useFloatingFocusWithin = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleFocus = useCallback(
    (e: FocusEvent) => {
      if (!containerRef.current) return;

      const target = e.target as HTMLElement;

      if (!containerRef.current.contains(target)) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
    },
    [containerRef, setIsVisible]
  );

  useEffect(() => {
    window.addEventListener("focusin", handleFocus);
    window.addEventListener("click", handleFocus);

    return () => {
      window.removeEventListener("focusin", handleFocus);
      window.removeEventListener("click", handleFocus);
    };
  }, [containerRef, setIsVisible, handleFocus]);
};
