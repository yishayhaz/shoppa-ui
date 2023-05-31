import { useEffect, useState, useRef } from "react";
import { isBetween } from "@shoppa-utils/isBetween";
import { debounce } from "@shoppa-utils/debounce";

export enum EDevices {
  mobile,
  tablet,
  desktop,
}

const DEVICES_SIZE: {
  [key in EDevices]: [number, number];
} = {
  [EDevices.mobile]: [0, 767],
  [EDevices.tablet]: [768, 1199],
  [EDevices.desktop]: [1200, Infinity],
};

const INITIAL_SIZE = 500; // avoid CLS at the cost of bad PC UX:(

export const useDevice = () => {
  const [screenWidth, setScreenWidth] = useState(INITIAL_SIZE);
  const [isTouch, setIsTouch] = useState(false);

  const handleResize = useRef(
    debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 100)
  ).current;

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setIsTouch("ontouchstart" in window);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const isMobile = isBetween(screenWidth, ...DEVICES_SIZE[EDevices.mobile]);
  const isTablet = isBetween(screenWidth, ...DEVICES_SIZE[EDevices.tablet]);
  const isDesktop = isBetween(screenWidth, ...DEVICES_SIZE[EDevices.desktop]);

  const device = isMobile
    ? EDevices.mobile
    : isTablet
    ? EDevices.tablet
    : EDevices.desktop;

  return {
    device,
    isMobile,
    isTabletOrMobile: isMobile || isTablet,
    isTablet,
    isDesktopOrTablet: isDesktop || isTablet,
    isDesktop,
    isTouch,
  };
};
