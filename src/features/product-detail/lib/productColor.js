export const getColorLabel = (color) => {
  if (typeof color === "string") {
    return color;
  }

  if (typeof color?.color_name === "string") {
    return color.color_name;
  }

  return "gray";
};

export const getColorStyle = (color) => {
  const label = getColorLabel(color).trim().toLowerCase();

  if (!label) {
    return { background: "#d9d9d9" };
  }

  if (label === "multicolor" || label === "multi color") {
    return {
      background:
        "linear-gradient(135deg, #ff5f6d 0%, #ffc371 30%, #47cf73 60%, #5b86e5 100%)",
    };
  }

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(label)) {
    return { background: label };
  }

  return { background: label };
};
