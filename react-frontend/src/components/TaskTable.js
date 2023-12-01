import React from "react";
import {
    statuses,
    getStatusColor,
    getCategoryColor,
} from "../styles/StatusAndCategory";
import { bodyCellStyle, headCellStyle } from "../styles/TableDesign";
import ContextMenu from "./ContextMenu";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
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

function TaskTable({
    tasks,
    removeOneTask,
    updateOneTask,
    toggleTaskInfo,
    getTaskId,
}) {
    const rows = tasks;

    const { handleContextMenu, contextMenuComponent } = ContextMenu({
        tasks,
        removeOneTask,
        toggleTaskInfo,
        getTaskId,
    });

    const handleStatusChange = (index, newStatus) => {
        updateOneTask(rows[index]._id, { status: newStatus });
    };

    const handlePriorityChange = (index) => {
        const newPriority = !rows[index].flagged;
        updateOneTask(rows[index]._id, { flagged: newPriority });
    };

    return (
        <TableContainer
            style={{ maxHeight: 600, overflowY: "auto" }}
            onContextMenu={(e) => e.preventDefault()}
        >
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
                    {rows.map((row, index) => (
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
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none", // Remove outline for outlined variant
                                        },
                                        height: 25,
                                    }}
                                >
                                    {statuses.map((status) => (
                                        <MenuItem key={status} value={status}>
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        getStatusColor(status)
                                                            .buttonColor,
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
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handlePriorityChange(index)
                                        }
                                    />
                                ) : (
                                    <BookmarkBorderOutlinedIcon
                                        style={{
                                            color: "#e48c65",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handlePriorityChange(index)
                                        }
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {contextMenuComponent}
        </TableContainer>
    );
}

export default TaskTable;
