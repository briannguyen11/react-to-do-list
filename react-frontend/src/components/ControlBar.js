import React, { useState } from "react";

import {
    statuses,
    categories,
    getStatusColor,
    getCategoryColor,
} from "../styles/StatusAndCategory";

import {
    Button,
    MenuItem,
    Select,
    ListSubheader,
    InputLabel,
    FormControl,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import CircleIcon from "@mui/icons-material/Circle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import { Container } from "@mui/system";

function ControlBar({ toggleTaskForm, changeTaskView, changeTableFilter }) {
    const [selectedFilter, setSelectedFilter] = useState("None");

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setSelectedFilter(value);
        changeTableFilter(value === "None" ? undefined : value);
    };

    return (
        <Container
            style={{
                padding: "10px 0",
                borderBottom: "3px solid #ddd",
            }}
        >
            <Grid container spacing={3} justifyContent="space-between">
                {/* Left Side */}
                <Grid container spacing={1}>
                    <Grid>
                        <Button
                            variant="contained"
                            className="clearNavButton"
                            style={{
                                height: "40px",
                                padding: "8px",
                                backgroundColor: "transparent",
                                textTransform: "none",
                                color: "black",
                                fontSize: "16px",
                                fontFamily: "Roboto, sans-serif",
                            }}
                            onClick={() => changeTaskView("taskTable")}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CheckBoxIcon style={{ marginRight: "8px" }} />
                                All Tasks
                            </div>
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            className="clearNavButton"
                            style={{
                                height: "40px",
                                padding: "8px",
                                backgroundColor: "transparent",
                                textTransform: "none",
                                color: "black",
                                fontSize: "16px",
                                fontFamily: "Roboto, sans-serif",
                            }}
                            onClick={() => changeTaskView("taskBoard")}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ViewWeekOutlinedIcon
                                    style={{ marginRight: "8px" }}
                                />
                                Board
                            </div>
                        </Button>
                    </Grid>
                </Grid>

                {/* Right Side */}
                <Grid container spacing={1}>
                    <Grid>
                        <FormControl fullWidth>
                            <InputLabel id="task-table-filter-label">
                                Filter By
                            </InputLabel>
                            <Select
                                labelId="task-table-filter-label"
                                id="task-table-filter"
                                label="Filter By"
                                value={selectedFilter}
                                onChange={handleFilterChange}
                                style={{ width: "175px", height: "40px" }}
                                inputProps={{
                                    style: { padding: "0px", margin: "0" },
                                }}
                            >
                                <MenuItem value="None">None</MenuItem>
                                <ListSubheader>Status</ListSubheader>
                                {statuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {/* Status menu items for filter are smaller */}
                                        <div
                                            style={{
                                                backgroundColor:
                                                    getStatusColor(status)
                                                        .buttonColor,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                borderRadius: 30,
                                                padding: "2px 15px 2px 10px", // top right bottom left
                                                fontSize: "14px",
                                            }}
                                        >
                                            <CircleIcon
                                                style={{
                                                    color: getStatusColor(
                                                        status
                                                    ).iconColor,
                                                    fontSize: "12px",
                                                    marginRight: "4px",
                                                }}
                                            />
                                            {status}
                                        </div>
                                    </MenuItem>
                                ))}
                                <ListSubheader>Category</ListSubheader>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        <span
                                            style={{
                                                backgroundColor:
                                                    getCategoryColor(category),
                                                borderRadius: 6,
                                                padding: "2px 15px 2px 10px", // top right bottom left
                                                fontSize: "14px",
                                            }}
                                        >
                                            {category}
                                        </span>
                                    </MenuItem>
                                ))}
                                <ListSubheader>Prioirty</ListSubheader>
                                <MenuItem value={true}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <BookmarkIcon
                                            style={{
                                                color: "#e48c65",
                                                marginRight: "8px",
                                            }}
                                        />
                                        Flagged
                                    </div>
                                </MenuItem>
                                <MenuItem value={false}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <BookmarkBorderOutlinedIcon
                                            style={{
                                                color: "#e48c65",
                                                marginRight: "8px",
                                            }}
                                        />
                                        Non-Flagged
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleTaskForm}
                            style={{
                                height: "40px",
                                padding: "8px",
                                textTransform: "none",
                                fontSize: "16px",
                            }}
                        >
                            New Task
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
export default ControlBar;
