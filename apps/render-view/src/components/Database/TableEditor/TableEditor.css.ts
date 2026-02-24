import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const tableEditorLayout = style({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.background,
});

export const tableEditorToolbar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[3],
  padding: `${vars.size[3]} ${vars.size[4]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  height: "8vh",
  boxSizing: "border-box",
});

export const tableEditorTitle = style({
  ...vars.font.lg,
  fontWeight: 600,
  color: vars.color.foreground,
  marginRight: vars.size[4],
});

export const tableEditorToolbarActions = style({
  display: "flex",
  alignItems: "center",
  flex: 1,
  gap: vars.size[2],
});

export const tableEditorGridWrap = style({
  height: "89vh",
  padding: vars.size[4],
  boxSizing: "border-box",
});

export const tableEditorTable = style({
  width: "100%",
  borderCollapse: "collapse",
  ...vars.font.sm,
});

export const tableEditorTh = style({
  textAlign: "left",
  padding: `${vars.size[2]} ${vars.size[3]}`,
  borderBottom: `2px solid ${vars.color.border}`,
  backgroundColor: vars.color.muted,
  color: vars.color.mutedForeground,
  fontWeight: 500,
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  gap: vars.size[1],
});

export const tableEditorHeaderInput = style({
  width: "6rem",
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

export const tableEditorHeaderSelect = style({
  padding: `${vars.size[1]} ${vars.size[2]}`,
  border: "none",
  outline: "none",
  backgroundColor: vars.color.input,
  color: vars.color.foreground,
  borderRadius: vars.size[1],
  ...vars.font.xs,
});

export const tableEditorThDelete = style({
  marginLeft: "auto",
  padding: vars.size[1],
  minWidth: "unset",
  fontSize: "1.25rem",
  lineHeight: 1,
});

export const tableEditorTd = style({
  padding: 0,
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: "middle",
});

export const tableEditorInput = style({
  width: "100%",
  minWidth: "8rem",
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

export const tableEditorEmpty = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.size[4],
  height: "100%",
  minHeight: "12rem",
  color: vars.color.mutedForeground,
  ...vars.font.m,
});
