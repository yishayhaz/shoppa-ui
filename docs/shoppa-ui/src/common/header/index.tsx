import { IconButton } from "@shoppa-ui/widgets/icon-button";
import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

export type HeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export function Header({ setIsOpen, isOpen }: HeaderProps) {
  return (
    <header
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
          <IconButton invert label="github" size="sm" variant="secondary">
            <BsGithub />
          </IconButton>
        </Link>
        <img
          src="https://welcome.shoppa.co.il/svgs/light-theme-logo.svg"
          alt="logo"
          width="auto"
          height="30px"
        />
      </div>
    </header>
  );
}
