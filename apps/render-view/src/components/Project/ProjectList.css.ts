import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const projectListLayout = style({
  width: "100%",
  maxWidth: vars.token.width.large,
  display: "grid",
  gap: vars.size[4],
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  "@media": {
    "screen and (min-width: 720px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});
