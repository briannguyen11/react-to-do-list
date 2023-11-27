const bodyCellStyle = (hasRightBorder) => ({
    borderRight: hasRightBorder ? "none" : "1px solid #ddd",
    padding: 8,
    color: "black",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 500,
});

const headCellStyle = (hasRightBorder) => ({
    borderRight: hasRightBorder ? "none" : "1px solid #ddd",
    padding: 8,
    color: "rgba(128, 128, 128, 0.8)",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 500,
});

export { bodyCellStyle, headCellStyle };
