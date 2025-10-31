const getColumnStyle = (column) => {
  const width = column.width;
  const colStyle = {
    width,
    maxWidth: width ?? column.maxWidth,
    minWidth: width ?? column.minWidth ?? "min-content",
    ...(column.wrap
      ? {}
      : {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
  };
  return { ...colStyle };
};

export default getColumnStyle;
