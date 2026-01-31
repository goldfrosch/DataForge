import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backdropFilter: "blur(1px)",
});

export const popup = style({
  backgroundColor: vars.color.background,
  borderRadius: vars.size.radius,
  padding: vars.size[6],
  overflow: "auto",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  position: "relative",
  width: "100%",
  maxWidth: vars.size.containerMd,
});

export const popupHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.size[4],
});

export const popupTitle = style({
  ...vars.font.lg,
  color: vars.color.foreground,
});

export const popupCloseIcon = style({
  width: vars.size[5],
  height: vars.size[5],
});

export const popupContent = style({
  padding: vars.size[4],
});
