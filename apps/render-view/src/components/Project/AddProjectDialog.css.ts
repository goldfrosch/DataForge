import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.size[6],
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.size[2],
});

export const label = style({
  ...vars.font.sm,
  fontWeight: 500,
  color: vars.color.foreground,
});

export const input = style({
  width: "100%",
  padding: `${vars.size[2]} ${vars.size[3]}`,
  backgroundColor: vars.color.input,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.size.radius,
  color: vars.color.foreground,
  ...vars.font.sm,
  "::placeholder": {
    color: vars.color.mutedForeground,
  },
  ":focus": {
    outline: "none",
    borderColor: vars.color.accent,
    boxShadow: `0 0 0 2px ${vars.color.accent}33`,
  },
});

export const formActions = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: vars.size[3],
});

export const pathRow = style({
  display: "flex",
  gap: vars.size[2],
  alignItems: "center",
});

export const pathInput = style({
  flex: 1,
});
