import { DefaultTheme, LightTheme, DarkTheme } from "styled-components";

export const theme: DefaultTheme = {
  mode: "default",
  bgColor: "#2B2B2B",
  textColor: "#f5f6fa",
  accentColor: "#9c88ff",
};

export const lightTheme: LightTheme = {
  mode: "light",
  bgColor: "white",
  textColor: "#1A1A1A",
  accentColor: "#E50915",
};

export const darkTheme: DarkTheme = {
  mode: "dark",
  bgColor: "#1A1A1A",
  textColor: "#F2F2F2",
  accentColor: "#E50915",
};
