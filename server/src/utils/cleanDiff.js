const cleanDiff = (diff) => {
  return diff
    .split("\n")
    .filter(
      (line) =>
        line.startsWith("+") ||
        line.startsWith("-")
    )
    .join("\n");
};

module.exports = cleanDiff;