import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const projectListInfoLayout = style({
  backgroundColor: `rgba(${vars.color.card}, 0.5)`,
  borderBottom: `${vars.color.border} 1px solid`,
  padding: `${vars.size[4]} ${vars.size[6]}`,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const projectListInfoContent = style({
  width: "100%",
  maxWidth: vars.token.width.large,
  color: vars.color.mutedForeground,
});

export const projectListInfoDataLayout = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[8],
});

export const projectListDetailInfoLayout = style({
  display: "flex",
  alignItems: "center",
  gap: vars.size[2],
});

export const projectListDetailInfoDataIcon = style({
  width: vars.size[4],
  height: vars.size[4],
});

export const projectListDetailInfoConnectIcon = style({
  color: vars.color.accent,
});

export const projectListDetailInfoCountText = style({
  color: vars.color.foreground,
  fontWeight: 500,
});
