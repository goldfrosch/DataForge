import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const defaultLayout = style({
  backgroundColor: vars.color.background,
  width: "100vw",
  height: "100vh",

  display: "flex",
  flexDirection: "column",
});

export const defaultBody = style({
  flex: 1,
  position: "relative",
});
