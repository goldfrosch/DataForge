import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const dropdownWrap = style({
  position: "relative",
  display: "inline-flex",
});

export const dropdownMenu = style({
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: vars.size[1],
  minWidth: "10rem",
  padding: vars.size[1],
  backgroundColor: vars.color.popover,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.size.radius,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  zIndex: 50,
});

export const dropdownItem = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: `${vars.size[2]} ${vars.size[3]}`,
  border: "none",
  background: "none",
  borderRadius: vars.size[1],
  cursor: "pointer",
  color: vars.color.foreground,
  ...vars.font.sm,
  textAlign: "left",
  gap: vars.size[2],
  ":hover": {
    backgroundColor: vars.color.accent,
    color: vars.color.accentForeground,
  },
});

export const dropdownItemDanger = style({
  ":hover": {
    backgroundColor: vars.color.destructive,
    color: vars.color.destructiveForeground,
  },
});

export const dropdownItemIcon = style({
  width: vars.size["3.5"],
  height: vars.size["3.5"],
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    "& svg": {
      width: "100%",
      height: "100%",
    },
  },
});
