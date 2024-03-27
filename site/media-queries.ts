import {
  desktopBreakpoint,
  largeDesktopBreakpoint,
  tabletBreakpoint,
} from "./breakpoints";

export const tablet = `@media screen and (min-width: ${tabletBreakpoint}px)`;
export const desktop = `@media screen and (min-width: ${desktopBreakpoint}px)`;
export const largeDesktop = `@media screen and (min-width: ${largeDesktopBreakpoint}px)`;
