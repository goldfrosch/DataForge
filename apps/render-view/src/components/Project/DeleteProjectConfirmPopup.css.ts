import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const message = style({
  ...vars.font.m,
  color: vars.color.foreground,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.size[2],
  marginTop: vars.size[4],
});
