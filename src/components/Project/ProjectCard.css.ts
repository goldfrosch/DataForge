import { vars } from "@/styles/Token.css";
import { style, styleVariants } from "@vanilla-extract/css";

const projectCardLayoutBase = style({
  padding: vars.size[5],
  backgroundColor: vars.color.card,
  border: `1px solid`,
  borderRadius: `calc(${vars.size.radius} + 4px)`,
  width: "100%",
  color: vars.color.foreground,
  borderColor: vars.color.border,

  ":hover": {
    color: vars.color.accent,
  },
});

export const projectCardLayout = styleVariants({
  enable: [
    projectCardLayoutBase,
    {
      ":hover": {
        borderColor: vars.color.accent,
      },
    },
  ],
  disable: [
    projectCardLayoutBase,
    {
      opacity: "60%",
    },
  ],
});

export const projectCardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
});

export const projectCardInfoLayout = style({
  display: "flex",
  gap: vars.size[3],
});

export const projectCardIconLayout = style({
  padding: vars.size["2.5"],
  backgroundColor: vars.color.secondary,
  borderRadius: vars.size.radius,
  borderColor: vars.color.border,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const projectCardIcon = style({
  width: vars.size[5],
  height: vars.size[5],
  color: vars.color.mutedForeground,
});

export const projectCardInfoContentLayout = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
});

export const projectCardInfoTitle = style({
  fontWeight: 500,
});

export const projectCardInfoDescription = style({
  ...vars.font.xs,
  color: vars.color.mutedForeground,
  marginTop: vars.size[1],
});

export const projectCardInfoOptionLayout = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  padding: vars.size[1.5],
  borderRadius: `calc(${vars.size.radius} - 2px)`,
  ":hover": {
    backgroundColor: vars.color.secondary,
  },
});

export const projectCardInfoOptionIcon = style({
  width: vars.size[4],
  height: vars.size[4],
  color: vars.color.mutedForeground,
});

export const projectCardFooterLayout = style({
  display: "flex",
  alignItems: "center",
  marginTop: vars.size[4],
  gap: vars.size[3],
});

export const projectCardTableCount = style({
  color: vars.color.mutedForeground,
  ...vars.font.xs,
});

export const projectCardFooterEmpty = style({
  flex: 1,
});

export const projectCardConnectedText = style({
  ...vars.font.xs,
  display: "flex",
  alignItems: "center",
  gap: vars.size["1.5"],
});

export const projectCardConnected = styleVariants({
  connect: {
    color: vars.color.accent,
  },
  disconnect: {
    color: vars.color.mutedForeground,
  },
});

export const projectCardConnectedIcon = style({
  width: vars.size["3.5"],
  height: vars.size["3.5"],
});
