import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const DatabasePageLayout = style({
  display: "flex",
  height: "100%",
  position: "relative",
});

export const DatabasePageMainLayout = style({
  flex: 1,
  overflow: "hidden",
});

export const DatabasePageEmpty = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: vars.color.mutedForeground,
  ...vars.font.m,
});
