type Color = "red" | "green" | "blue";

type Colors = {
  [C in Color]: C;
};
