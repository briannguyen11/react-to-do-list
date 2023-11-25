import React, { useState } from "react";
import {
    statuses,
    getStatusColor,
    getCategoryColor,
} from "../styles/ButtonDesign";
import { bodyCellStyle, headCellStyle } from "../styles/TableDesign";
import ContextMenu from "./ContextMenu";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Select,
    MenuItem,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WindowIcon from "@mui/icons-material/Window";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import CircleIcon from "@mui/icons-material/Circle";

function TaskTable({ tasks, removeOneTask, toggleTaskInfo, getTaskId }) {
    const rows = tasks;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { handleContextMenu, contextMenuComponent } = ContextMenu({
        tasks,
        removeOneTask,
        toggleTaskInfo,
        getTaskId,
    });

    const handleStatusChange = (index, newStatus) => {
        // Add logic to update the status in your data structure
        // For example, call a function passed as a prop to update the status.
        // props.onStatusChange(index, newStatus);
        console.log(index);
        console.log(newStatus);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer onContextMenu={(e) => e.preventDefault()}>
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
                            style={headCellStyle(true)}
                            sx={{ width: "10%" }}
                        >
                            <ArrowDropDownCircleIcon
                                style={{
                                    marginRight: 6,
                                    position: "relative",
                                    top: "5",
                                }}
                            />
                            Priority
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
                            <TableRow
                                key={index}
                                onContextMenu={(event) =>
                                    handleContextMenu(event, index)
                                }
                            >
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
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            getStatusColor(
                                                                status
                                                            ).backgroundColor,
                                                        display: "inline-flex",
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
                                                </div>
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
                                    style={bodyCellStyle(true)}
                                    align="left"
                                    sx={{ width: "10%" }}
                                >
                                    {row.flagged ? (
                                        <BookmarkIcon
                                            style={{
                                                color: "#e48c65",
                                            }}
                                        />
                                    ) : (
                                        <BookmarkBorderOutlinedIcon
                                            style={{
                                                color: "#e48c65",
                                            }}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {contextMenuComponent}
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
