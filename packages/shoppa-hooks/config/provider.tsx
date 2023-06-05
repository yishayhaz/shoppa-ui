import React, { createContext, useCallback, useEffect, useState } from "react";
import { getSystemTheme } from "shoppa-utils/window";

export type ConfigProviderProps = {
  children: React.ReactNode;
};

export type Config = {
  theme: string;
  userPreference: keyof typeof EUserPreference;
  switchTheme: (theme: keyof typeof EUserPreference) => void;
};

export enum ETheme {
  light = "light",
  dark = "dark",
}

export enum EUserPreference {
  light = "light",
  dark = "dark",
  system = "system",
}

export const ConfigContext = createContext({} as Config);

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [theme, setTheme] = useState<keyof typeof ETheme>(ETheme.light);
  const [userPreference, setUserPreference] = useState<
    keyof typeof EUserPreference
  >(EUserPreference.system);

  const switchTheme = (theme: keyof typeof EUserPreference) => {
    if (theme === EUserPreference.system) {
      localStorage.removeItem("theme");
      setUserPreference(theme);
      return;
    }

    localStorage.setItem("theme", theme);
    setUserPreference(theme);
  };

  const handleSetUserPrefernce = () => {
    const localPreference = localStorage.getItem("theme");

    if (!localPreference) return;
    if (!Object.values(ETheme).includes(localPreference as any)) {
      localStorage.removeItem("theme");
      return;
    }

    setUserPreference(localPreference as EUserPreference);
  };

  const handleUserPrefernceChange = useCallback(() => {
    if (userPreference === EUserPreference.system) {
      setTheme(getSystemTheme());
      return;
    }

    setTheme(userPreference);
  }, [userPreference]);

  useEffect(() => {
    handleSetUserPrefernce();
  }, []);

  useEffect(() => {
    handleUserPrefernceChange();
  }, [userPreference, handleUserPrefernceChange]);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <ConfigContext.Provider
      value={{
        theme,
        userPreference,
        switchTheme,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
