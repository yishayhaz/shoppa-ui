import { Input } from "@shoppa-ui/widgets/input";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { Button } from "@shoppa-ui/widgets/button";

const LINKS = [
  { to: "/docs/alert", label: "Alert" },
  { to: "/docs/banner", label: "Banner" },
  { to: "/docs/button", label: "Button" },
  { to: "/docs/collapse", label: "Collapse" },
  { to: "/docs/drawer", label: "Drawer" },
  { to: "/docs/input", label: "Input" },
  { to: "/docs/spinner", label: "Spinner" },
];

export function Nav() {
  const location = useLocation();

  const [links, setLinks] = useState(LINKS);
  const [active, setActive] = useState("/docs/alert");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setLinks(LINKS);
      return;
    }

    const filteredLinks = [...LINKS].filter((link) =>
      link.label.toLowerCase().includes(value.toLowerCase())
    );

    setLinks(filteredLinks);
  };

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <nav style={{ padding: 10 }}>
      <div>
        <Input
          icon={<RiSearchLine />}
          type="search"
          placeholder={`Search (${LINKS.length})`}
          onChange={handleSearch}
        />
      </div>
      <br />
      {links.length === 0 && (
        <div className="text-center">
          <span>Oof..</span>
        </div>
      )}
      <ul className="d-flex flex-column align-items-stretch gap-2">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to} className="reset-link">
              <Button
                asLink={active !== link.to}
                variant="secondary"
                className="flex-start"
              >
                {link.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
