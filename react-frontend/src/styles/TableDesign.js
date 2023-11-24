const bodyCellStyle = (hasRightBorder) => ({
    borderRight: hasRightBorder ? "none" : "1px solid #ddd",
    padding: 8,
    color: "#000",
    fontFamily: "Montserrat , sans-serif",
    fontSize: "16px",
});

const headCellStyle = (hasRightBorder) => ({
    borderBottom: "3px solid #ddd",
    borderRight: hasRightBorder ? "none" : "1px solid #ddd",
    padding: 8,
    color: "rgba(128, 128, 128, 0.8)",
    fontFamily: "Montserrat , sans-serif",
});

export { bodyCellStyle, headCellStyle };
