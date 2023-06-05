export const getBoundaries = (element: HTMLElement) => {
  let { top, right, bottom, left, width, height } =
    element.getBoundingClientRect();

  right = window.innerWidth - right;
  bottom = window.innerHeight - bottom;

  return { top, right, bottom, left, width, height };
};

export const isRtl = (elem: HTMLElement = document.body) => {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");

  return direction === "rtl";
};

export const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};
