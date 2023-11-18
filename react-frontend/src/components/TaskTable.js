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
    Select,
    MenuItem,
} from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WindowIcon from "@mui/icons-material/Window";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import CircleIcon from "@mui/icons-material/Circle";

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

    const statuses = ["Not Started", "In Progress", "Done"];

    const handleStatusChange = (index, newStatus) => {
        // Add logic to update the status in your data structure
        // For example, call a function passed as a prop to update the status.
        // props.onStatusChange(index, newStatus);
        console.log(index);
        console.log(newStatus);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Started":
                return { backgroundColor: "#f0f0f0", iconColor: "#767676" };
            case "In Progress":
                return { backgroundColor: "#ffebbd", iconColor: "#cc7722" };
            case "Done":
                return { backgroundColor: "#d2e7d6", iconColor: "#50835c" };
            default:
                return { backgroundColor: "#f0f0f0", iconColor: "#767676" };
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "Personal":
                return "#ffdddd"; // Red background for Personal
            case "Work":
                return "#ffebbd"; // Yellow background for Work
            case "School":
                return "#d2e7d6"; // Green background for School
            case "Sports":
                return "#c7e1ff"; // Blue background for Sports
            default:
                return "#f0f0f0"; // Default background color
        }
    };

    const handleChangePage = (newPage) => {
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
                        <TableCell
                            style={headCellStyle(false)}
                            sx={{ width: "5%" }}
                        >
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
                            <AssignmentIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "6",
                                }}
                            />
                            Task Name
                        </TableCell>
                        <TableCell
                            style={headCellStyle(false)}
                            sx={{ width: "15%" }}
                        >
                            <CalendarMonthIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "5",
                                }}
                            />
                            Date
                        </TableCell>
                        <TableCell
                            style={headCellStyle(false)}
                            sx={{ width: "15%" }}
                        >
                            <WindowIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "6",
                                }}
                            />
                            Category
                        </TableCell>
                        <TableCell
                            style={headCellStyle(false)}
                            sx={{ width: "10%" }}
                        >
                            <StarPurple500Icon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "5",
                                }}
                            />
                            Priority
                        </TableCell>
                        <TableCell
                            style={headCellStyle(true)}
                            sx={{ width: "10%" }}
                        >
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
                                    sx={{ width: "5%" }}
                                >
                                    <Select
                                        value={row.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        IconComponent={() => null}
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    border: "none", // Remove outline for outlined variant
                                                },
                                            height: 25,
                                        }}
                                    >
                                        {statuses.map((status) => (
                                            <MenuItem
                                                key={status}
                                                value={status}
                                            >
                                                <span
                                                    style={{
                                                        backgroundColor:
                                                            getStatusColor(
                                                                status
                                                            ).backgroundColor,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        borderRadius: 32,
                                                        padding:
                                                            "4px 15px 4px 10px", // top right bottom left
                                                    }}
                                                >
                                                    <CircleIcon
                                                        style={{
                                                            color: getStatusColor(
                                                                status
                                                            ).iconColor,
                                                            fontSize: "14px",
                                                            marginRight: "4px",
                                                        }}
                                                    />
                                                    {status}
                                                </span>
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                    sx={{ width: "15%" }}
                                >
                                    {new Date(row.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    align="left"
                                    sx={{ width: "15%" }}
                                >
                                    <span
                                        style={{
                                            backgroundColor: getCategoryColor(
                                                row.category
                                            ),
                                            borderRadius: 8,
                                            padding: "4px 15px 4px 10px", // top right bottom left
                                        }}
                                    >
                                        {row.category}
                                    </span>
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(false)}
                                    align="left"
                                    sx={{ width: "10%" }}
                                >
                                    <FlagToggleButton />
                                </TableCell>
                                <TableCell
                                    style={bodyCellStyle(true)}
                                    align="left"
                                    sx={{ width: "10%" }}
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
