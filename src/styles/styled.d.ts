import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    mode: string;
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
  export interface LightTheme {
    mode: string;
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
  export interface DarkTheme {
    mode: string;
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
