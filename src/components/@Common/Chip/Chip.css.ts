import { vars } from "@/styles/Token.css";
import { style, styleVariants } from "@vanilla-extract/css";

const baseChipStyle = style({
  padding: `${vars.size[1]} ${vars.size[2]}`,
  borderRadius: `calc(${vars.size.radius} - 2px)`,
});

export const chipStyle = styleVariants({
  gray: [
    baseChipStyle,
    {
      backgroundColor: vars.color.secondary,
      color: vars.color.mutedForeground,
    },
  ],
});
