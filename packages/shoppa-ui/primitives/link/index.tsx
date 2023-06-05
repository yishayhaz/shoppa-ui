import React from "react";

export type LinkProps = {
  Component?: React.ElementType;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  (ReactRouterDomLinkProps | NextJsLinkProps);

export type ReactRouterDomLinkProps = {
  reloadDocument?: boolean;
  replace?: boolean;
  preventScrollReset?: boolean;
  relative?: "route" | "path";
  to:
    | string
    | {
        pathname?: string;
        search?: string;
        hash?: string;
      };
  caseSensitive?: boolean;
  end?: boolean;
};

export type NextJsLinkProps = {
  href?:
    | string
    | {
        auth?: string | null | undefined;
        hash?: string | null | undefined;
        host?: string | null | undefined;
        hostname?: string | null | undefined;
        href?: string | null | undefined;
        pathname?: string | null | undefined;
        protocol?: string | null | undefined;
        search?: string | null | undefined;
        slashes?: boolean | null | undefined;
        port?: string | number | null | undefined;
        query?: any;
      };
  as?:
    | string
    | {
        auth?: string | null | undefined;
        hash?: string | null | undefined;
        host?: string | null | undefined;
        hostname?: string | null | undefined;
        href?: string | null | undefined;
        pathname?: string | null | undefined;
        protocol?: string | null | undefined;
        search?: string | null | undefined;
        slashes?: boolean | null | undefined;
        port?: string | number | null | undefined;
        query?: any;
      };
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
};

export function Link({ Component = "a", className, ...rest }: LinkProps) {
  return <Component {...rest} className={`reset-link ${className || ""}`} />;
}
