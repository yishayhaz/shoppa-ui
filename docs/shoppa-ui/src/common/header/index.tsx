import { IconButton } from "@shoppa-ui/widgets/icon-button";
import React, { useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillMoonStarsFill, BsGithub } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";

export type HeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export function Header({ setIsOpen, isOpen }: HeaderProps) {
  const [isDark, setIsDark] = React.useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  useEffect(() => {
    document.body.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <header
      style={{ position: "sticky", top: "0" }}
      className="bg-s-neutral-bg"
    >
      <div
        style={{ padding: "20px 50px" }}
        className="d-flex justify-content-space-between"
      >
        <div className="d-flex gap-20">
          <IconButton label="menu" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose /> : <HiMenuAlt1 />}
          </IconButton>
          <h1>Shoppa UI</h1>
        </div>
        <div className="d-flex gap-20">
          <Link
            target="_blank"
            to="https://github.com/yishayhaz/shoppa-ui"
            className="reset-link"
          >
            <IconButton
              invert
              label="github"
              size="sm"
              variant="secondary"
              square
            >
              <BsGithub />
            </IconButton>
          </Link>
          <IconButton
            onClick={handleTheme}
            label="mode"
            size="sm"
            variant="warning"
            square
          >
            {isDark ? (
              <IoMdSunny color="black" />
            ) : (
              <BsFillMoonStarsFill color="black" />
            )}
          </IconButton>
          <img
            src={`https://assets.shoppa.co.il/defaults/${
              isDark ? "dark" : "light"
            }-theme-logo.svg`}
            alt="logo"
            width="auto"
            height="30px"
          />
        </div>
      </div>
    </header>
  );
}
