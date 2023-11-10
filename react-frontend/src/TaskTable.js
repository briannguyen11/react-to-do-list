import React, { useState } from "react";

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TablePagination,
    makeStyles,
    IconButton,
} from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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

    const cellStyle = {
        borderRight: "1px solid #ddd", // Adjust the border style as needed
        padding: 8,
    };

    const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650,
        },
        headerCell: {
            fontWeight: "bold",
            borderRight: "1px solid #ddd",
            padding: theme.spacing(2),
        },
        bodyCell: {
            borderRight: "1px solid #ddd",
            padding: theme.spacing(1),
        },
    }));

    const classes = useStyles;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={classes.headerCell}>Status</TableCell>
                        <TableCell style={cellStyle}>Task Name</TableCell>
                        <TableCell style={cellStyle}>Date</TableCell>
                        <TableCell style={cellStyle}>Category</TableCell>
                        <TableCell style={cellStyle} align="right">
                            Priority
                        </TableCell>
                        <TableCell style={cellStyle} align="right">
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
                                <TableCell style={cellStyle} align="left">
                                    {String(row.completed)}
                                </TableCell>
                                <TableCell
                                    style={cellStyle}
                                    component="th"
                                    scope="row"
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell style={cellStyle} align="left">
                                    {row.date}
                                </TableCell>
                                <TableCell style={cellStyle} align="right">
                                    {row.category}
                                </TableCell>
                                <TableCell style={cellStyle} align="right">
                                    <FlagToggleButton />
                                </TableCell>
                                <TableCell style={cellStyle} align="right">
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
