import { vars } from "@/styles/Token.css";
import { style, styleVariants } from "@vanilla-extract/css";

const baseChipStyle = style({
  padding: `${vars.size[1]} ${vars.size[2]}`,
  borderRadius: `calc(${vars.size.radius} - 2px)`,
});

export const chipStyle = styleVariants({
  unreal: [
    baseChipStyle,
    {
      backgroundColor: "#5f697d",
      color: "#37435d",
    },
  ],
  unity: [
    baseChipStyle,
    {
      backgroundColor: "#5f697d",
      color: "#37435d",
    },
  ],
});
