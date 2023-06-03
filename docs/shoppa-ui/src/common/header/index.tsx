import { IconButton } from "@shoppa-ui/widgets/icon-button";
import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiSwitchHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillMoonStarsFill, BsGithub } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";

export type HeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export function Header({ setIsOpen, isOpen }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);

  const handleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  const handleDir = () => {
    document.body.dir = document.body.dir === "rtl" ? "ltr" : "rtl";
  };

  useEffect(() => {
    document.body.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    setIsDark(localStorage.getItem("theme") === "dark");
  }, []);

  return (
    <header
      style={{ position: "sticky", top: "0", zIndex: 1000 }}
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
        <div className="d-flex gap-10">
          <IconButton label="lang" square size="sm" onClick={handleDir}>
            <HiSwitchHorizontal />
          </IconButton>
          <Link
            target="_blank"
            to="https://github.com/yishayhaz/shoppa-ui"
            className="reset-link"
          >
            <IconButton label="github" size="sm" variant="neutral" square>
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
            width="120px"
            height="30px"
          />
        </div>
      </div>
    </header>
  );
}
