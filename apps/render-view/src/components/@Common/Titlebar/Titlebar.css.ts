import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const titlebarLayout = style({
  backgroundColor: vars.color.background,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const titlebarRightLayout = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

export const titlebarThumbnailLayout = style({
  backgroundColor: vars.color.accent,
  borderRadius: vars.size[1],
  padding: vars.size[3],

  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

export const titlebarCenterLayout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: "center",

  color: vars.color.mutedForeground,
})

export const titlebarContentLayout = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[2],
});

export const titlebarIconLayout = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "none",

  padding: `${vars.size[1]} ${vars.size[2]}`,
});

export const titlebarIcon = style({
  width: vars.size[5],
  height: vars.size[5],
});

export const titlebarIconHovered = style({
  color: vars.color.mutedForeground,
  ":hover": {
    backgroundColor: vars.color.mutedForeground,
    color: vars.color.muted,
  },
});

export const titlebarExitIconHovered = style({
  color: vars.color.mutedForeground,
  ":hover": {
    backgroundColor: vars.color.destructive,
  },
});
