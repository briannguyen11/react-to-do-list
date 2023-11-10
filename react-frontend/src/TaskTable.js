import React, { useState } from "react";

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    IconButton,
} from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ViewListIcon from "@mui/icons-material/ViewList";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
function DeleteButton() {
    const handleDelete = () => {
        // Implement the delete logic here
    };

    return (
        <IconButton onClick={handleDelete} color="secondary">
            <DeleteOutlineIcon />
        </IconButton>
    );
}

function FlagToggleButton() {
    const [isFlagged, setIsFlagged] = useState(false);

    const handleToggleFlag = () => {
        setIsFlagged(!isFlagged);
    };

    return (
        <div>
            <IconButton onClick={handleToggleFlag}>
                {isFlagged ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
            </IconButton>
        </div>
    );
}

function TaskTable(props) {
    const rows = props.taskData;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={headCellStyle(false)}>
                            <ScatterPlotIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "5",
                                }}
                            />
                            Status
                        </TableCell>
                        <TableCell style={headCellStyle(false)}>
                            <ModeEditIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "6",
                                }}
                            />
                            Task Name
                        </TableCell>
                        <TableCell style={headCellStyle(false)}>
                            <CalendarMonthIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "5",
                                }}
                            />
                            Date
                        </TableCell>
                        <TableCell style={headCellStyle(false)}>
                            <ViewListIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "6",
                                }}
                            />
                            Category
                        </TableCell>
                        <TableCell style={headCellStyle(false)} align="right">
                            <StarPurple500Icon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "5",
                                }}
                            />
                            Priority
                        </TableCell>
                        <TableCell style={headCellStyle(true)} align="right">
                            Delete
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    align="left"
                                >
                                    {String(row.completed)}
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    component="th"
                                    scope="row"
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    align="left"
                                >
                                    {row.date}
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    align="right"
                                >
                                    {row.category}
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    align="right"
                                >
                                    <FlagToggleButton />
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(true)}
                                    align="right"
                                >
                                    <DeleteButton />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default TaskTable;
