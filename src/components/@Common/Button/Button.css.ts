import { vars } from "@/styles/Token.css";
import { style, styleVariants } from "@vanilla-extract/css";

const buttonBaseStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const buttonStyle = styleVariants({
  primary: [
    buttonBaseStyle,
    {
      color: vars.color.accentForeground,
      backgroundColor: vars.color.accent,
      ":hover": {
        opacity: 0.9,
      },
    },
  ],
  none: [
    buttonBaseStyle,
    {
      color: vars.color.mutedForeground,
      background: "none",
      ":hover": {
        color: vars.color.sidebarForeground,
        backgroundColor: `color-mix(
          in srgb,
          ${vars.color.sidebarAccent} 50%,
          transparent
        )`,
      },
    },
  ],
});

export const buttonSize = styleVariants({
  m: {
    padding: `${vars.size["2.5"]} ${vars.size[4]}`,
    borderRadius: vars.size.radius,
    ...vars.font.sm,
  },
});
