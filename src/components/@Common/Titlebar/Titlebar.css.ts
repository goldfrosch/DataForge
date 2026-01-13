import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const titlebarLayout = style({
  padding: `${vars.size[1]} ${vars.size[2]}`,
  backgroundColor: vars.color.background,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const titlebarIconLayout = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "none",
});

export const titlebarIcon = style({
  width: vars.size[5],
  height: vars.size[5],
});
