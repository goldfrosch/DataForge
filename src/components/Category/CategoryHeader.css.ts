import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/Token.css";

export const categoryHeaderLayout = style({
  display: "flex",
  justifyContent: "center",
  backgroundColor: vars.color.card,
  borderBottom: `${vars.color.border} 1px solid`,
  padding: vars.size[6],
});

export const categoryHeaderContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: vars.token.width.large,
});

export const categoryHeaderInformation = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[4],
});

export const categoryHeaderIconLayout = style({
  padding: vars.size[3],
  backgroundColor: `color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
  borderRadius: 16,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const categoryHeaderIcon = style({
  width: vars.size[7],
  height: vars.size[7],
  color: vars.color.accent,
});

export const categoryHeaderTitle = style({
  color: vars.color.foreground,
  ...vars.font.xl2,
});

export const categoryHeaderDescription = style({
  color: vars.color.mutedForeground,
  marginTop: 2,
  ...vars.font.sm,
});

export const categoryHeaderAddProjectButton = style({
  gap: vars.size[1],
});
