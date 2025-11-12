const getColumnStyle = (column) => {
  const width = column.width;
  const colStyle = {
    width,
    maxWidth: width ?? column.maxWidth,
    minWidth: width ?? column.minWidth ?? "min-content",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
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
