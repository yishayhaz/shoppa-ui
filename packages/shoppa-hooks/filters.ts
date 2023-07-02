import { useCallback, useEffect, useMemo, useState } from "react";
import { AnyObject } from "shoppa-ts";
import { getSearchParams } from "shoppa-utils/params";

export type Filters = { [key: string]: Filter };

export type Filter = "string" | "number" | "boolean" | "date";

export type UseFiltersOnChange = (key: string, value: string) => void;

export type UseFiltersSearchParam = {
  [key: string]: UseFiltersSearchParamValue;
};

export type UseFiltersSearchParamValue = string | number | boolean | Date;

export type UseFiltersReturn = {
  onChange: UseFiltersOnChange;
  searchParams: UseFiltersSearchParam;
  asValues: AnyObject;
};

export const useFilters = (filters: Filters): UseFiltersReturn => {
  const [searchParams, setSearchParams] = useState<UseFiltersSearchParam>({});

  const _extractInitialFilters = () => {
    const searchParams = getSearchParams(...Object.keys(filters));
    const params: AnyObject = {};

    for (const [key, value] of Object.entries(searchParams)) {
      const param = _convertValueByType(filters[key], value);

      if (param === null) continue;

      params[key] = param;
    }

    setSearchParams(params);
  };

  const _convertValueByType = (type: string, value: string) => {
    if (value === "") return null;

    if (type === "string") {
      return value;
    }

    if (type === "number") {
      if (isNaN(Number(value))) return null;
      return Number(value);
    }

    if (type === "boolean") {
      if (!["true", "false", true, false].includes(value)) return null;
      return value === "true";
    }

    if (type === "date") {
      let _value: UseFiltersSearchParamValue = value;
      if (Number.isInteger(Number(_value))) _value = Number(_value);

      if (new Date(_value).toString() === "Invalid Date") return null;
      return new Date(_value).getTime();
    }
  };

  const _goToParams = useCallback(
    (params = searchParams) => {
      const newParams: AnyObject = {};
      for (const [key, value] of Object.entries(params)) {
        newParams[key] = value.toString();
      }
      const searchParams = new URLSearchParams(newParams);
      window.history.pushState({}, "", `?${searchParams.toString()}`);
    },
    [searchParams]
  );

  useEffect(() => {
    _extractInitialFilters();
  }, []);

  useEffect(() => {
    _goToParams();
  }, [searchParams]);

  const onChange: UseFiltersOnChange = (key, value) => {
    if (!filters[key]) return;

    const param = _convertValueByType(filters[key], value);
    const newSearchParams = { ...searchParams };

    if (param === null || typeof param === "undefined") {
      delete newSearchParams[key];
    } else {
      newSearchParams[key] = param;
    }

    setSearchParams(newSearchParams);
  };

  const asValues = useMemo(() => {
    const values: AnyObject = {};
    for (const [key, value] of Object.entries(searchParams)) {
      if (filters[key] === "date" && typeof value !== "boolean") {
        values[key] = new Date(value).toISOString().split("T")[0];
      } else {
        values[key] = value.toString();
      }
    }
    return values;
  }, [searchParams]);

  return {
    onChange,
    searchParams,
    asValues,
  };
};
