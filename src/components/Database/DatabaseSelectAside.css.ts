import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const databaseSelectAsideLayout = style({
  width: vars.size[64],
  height: "100vh",
  backgroundColor: vars.color.sidebar,
  borderRight: `1px solid ${vars.color.sidebarBorder}`,

  display: "flex",
  flexDirection: "column",
});

export const databaseSelectAsideHeader = style({
  padding: vars.size[3],
  borderBottom: `1px solid ${vars.color.sidebarBorder}`,
});

export const databaseSelectAsideBackButton = style({
  justifyContent: "flex-start",
  width: "100%",
  gap: vars.size[2],
  padding: `${vars.size[1.5]} ${vars.size[2]}`,
});

export const databaseSelectAsideBackButtonIcon = style({
  width: vars.size[4],
  height: vars.size[4],
});

export const databaseSelectAsideInfomation = style({
  padding: vars.size[4],
  borderBottom: `1px solid ${vars.color.sidebarBorder}`,

  display: "flex",
  alignItems: "center",
  gap: vars.size[2],
});

export const databaseSelectAsideInfomationIcon = style({
  width: vars.size[5],
  height: vars.size[5],

  color: vars.color.accent,
});

export const databaseSelectAsideInfomationIconLayout = style({
  backgroundColor: vars.color.sidebarAccent,
  borderRadius: vars.size.radius,
  padding: vars.size[2],

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const databaseSelectAsideInfomationBox = style({
  flex: 1,
});

export const databaseSelectAsideInfomationTitle = style({
  color: vars.color.sidebarForeground,
  fontWeight: 600,
  ...vars.font.m,
  ...vars.token.text.truncate,
});

export const databaseSelectAsideInfomationDescription = style({
  color: vars.color.mutedForeground,
  ...vars.font.xs,
  ...vars.token.text.truncate,
});

export const databaseSelectAsideTableList = style({
  flex: 1,
  borderBottom: `1px solid ${vars.color.sidebarBorder}`,
  padding: vars.size[3],
});

export const databaseSelectAsideTableTitle = style({
  color: vars.color.mutedForeground,
  ...vars.font.xs,
  letterSpacing: vars.size.wider,
  marginBottom: vars.size[2],
});

export const databaseSelectAsideTableCard = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: vars.size[3],
  color: vars.color.mutedForeground,
  background: "none",
  padding: `${(vars.size[2.5], vars.size[3])}`,
});

export const databaseSelectAsideTableEmpty = style({
  flex: 1,
});

export const databaseSelectAsideTableRowCount = style({
  color: vars.color.mutedForeground,
  ...vars.font.xs,
});

export const databaseSelectAsideSettings = style({
  padding: vars.size[3],
});

export const databaseSelectAsideSettingsButton = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: vars.size[3],
  color: vars.color.mutedForeground,
  background: "none",
  padding: `${(vars.size[2.5], vars.size[3])}`,
});

export const databaseSelectAsideSettingsIcon = style({
  width: vars.size[4],
  height: vars.size[4],
});
