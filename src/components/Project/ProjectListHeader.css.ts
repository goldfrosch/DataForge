import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/Token.css";

export const projectListHeaderLayout = style({
  display: "flex",
  justifyContent: "center",
  backgroundColor: vars.color.card,
  borderBottom: `${vars.color.border} 1px solid`,
  padding: vars.size[6],
});

export const projectListHeaderContent = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: vars.token.width.large,
  gap: vars.size[4],
});

export const projectListHeaderInformation = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[4],
});

export const projectListHeaderIconLayout = style({
  padding: vars.size[3],
  backgroundColor: `color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
  borderRadius: 16,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const projectListHeaderIcon = style({
  width: vars.size[7],
  height: vars.size[7],
  color: vars.color.accent,
});

export const projectListHeaderTitle = style({
  color: vars.color.foreground,
  ...vars.font.xl2,
});

export const projectListHeaderDescription = style({
  color: vars.color.mutedForeground,
  marginTop: 2,
  ...vars.font.sm,
});

export const projectListHeaderAddProjectButton = style({
  gap: vars.size[1],
});

export const projectListHeaderEmpty = style({
  flex: 1,
});
