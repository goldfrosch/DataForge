import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const dataTableContainer = style({
  width: "100%",
  height: "100%",
  overflow: "auto",
});

export const dataTableGrid = style({
  display: "grid",
  width: "fit-content",
  borderLeft: `1px solid ${vars.color.border}`,
  borderTop: `1px solid ${vars.color.border}`,
});

export const dataTableHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[1],
  padding: `${vars.size[2]} ${vars.size[3]}`,
  borderBottom: `2px solid ${vars.color.border}`,
  borderRight: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.muted,
  color: vars.color.mutedForeground,
  fontWeight: 500,
  minHeight: "3.5rem",
});

export const dataTableHeaderInput = style({
  flex: 1,
  minWidth: "6rem",
  padding: `${vars.size[1]} ${vars.size[2]}`,
  border: "none",
  outline: "none",
  backgroundColor: vars.color.input,
  color: vars.color.foreground,
  borderRadius: vars.size[1],
  ...vars.font.sm,
  ":focus": {
    boxShadow: `0 0 0 1px ${vars.color.ring}`,
  },
});

export const dataTableHeaderSelect = style({
  padding: `${vars.size[1]} ${vars.size[2]}`,
  border: "none",
  outline: "none",
  backgroundColor: vars.color.input,
  color: vars.color.foreground,
  borderRadius: vars.size[1],
  ...vars.font.xs,
  cursor: "pointer",
});

export const dataTableHeaderDelete = style({
  padding: vars.size[1],
  minWidth: "unset",
  fontSize: "1.25rem",
  lineHeight: 1,
});

export const dataTableCell = style({
  borderBottom: `1px solid ${vars.color.border}`,
  borderRight: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.background,
  minHeight: "2.5rem",
  display: "flex",
  alignItems: "center",
});

export const dataTableInput = style({
  width: "100%",
  height: "100%",
  padding: `${vars.size[2]} ${vars.size[3]}`,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: vars.color.foreground,
  ...vars.font.sm,
  ":focus": {
    backgroundColor: vars.color.input,
    boxShadow: `inset 0 0 0 1px ${vars.color.ring}`,
  },
});

export const dataTableCheckbox = style({
  margin: `0 auto`,
  width: vars.size[4],
  height: vars.size[4],
  cursor: "pointer",
  accentColor: vars.color.accent,
});
