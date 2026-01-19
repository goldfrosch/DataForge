import { vars } from "@/styles/Token.css";
import { style } from "@vanilla-extract/css";

export const mainPageLayout = style({
  padding: `${vars.size[8]} ${vars.size[6]}`,

  width: "100%",
  display: "flex",
  justifyContent: "center",
});
