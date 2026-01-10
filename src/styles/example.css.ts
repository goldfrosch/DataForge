import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center",
});

export const card = style({
  padding: "2em",
});

export const button = style({
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: 500,
  fontFamily: "inherit",
  backgroundColor: "#1a1a1a",
  cursor: "pointer",
  transition: "border-color 0.25s",
  ":hover": {
    borderColor: "#646cff",
  },
  ":focus": {
    outline: "4px auto -webkit-focus-ring-color",
  },
});

export const text = style({
  color: "#888",
});
