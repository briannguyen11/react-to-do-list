import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import IconButton from "@mui/material/IconButton";
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

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

function TaskTable(props) {
    const rows = props.taskData;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Delete</TableCell>
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
                                // sx={{
                                //     "&:last-child td, &:last-child th": {
                                //         border: 0,
                                //     },
                            >
                                {/* <TableCell align="left">
                                    {row.completed}
                                </TableCell> */}
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                {/* <TableCell align="right">
                                    {row.category}
                                </TableCell> */}
                                <TableCell align="right">
                                    <FlagToggleButton />
                                </TableCell>
                                <TableCell align="right">
                                    <DeleteButton />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
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
