import React, { useState } from "react";

import {
    statuses,
    categories,
    getStatusColor,
    getCategoryColor,
} from "../styles/ButtonDesign";

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
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

import "../styles/crooStyle.css";

function ControlBar({ toggleTaskForm, onFilterChange }) {
    const [selectedFilter, setSelectedFilter] = useState("None");

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setSelectedFilter(value);
        onFilterChange(value === "None" ? undefined : value);
    };

    return (
        <Grid container spacing={3} justifyContent="space-between">
            {/* Left Side */}
            <Grid container spacing={1}>
                <Grid>
                    <Button
                        variant="contained"
                        className="clearNavButton"
                        // style={{ height: "50px", padding: "8px" }}
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
                        // style={{ height: "50px", padding: "8px" }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <ViewWeekIcon style={{ marginRight: "8px" }} />
                            Baord
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
                            style={{ width: "175px", height: "50px" }}
                            inputProps={{
                                style: { padding: "0px", margin: "0" },
                            }}
                        >
                            <MenuItem value="None">None</MenuItem>
                            <ListSubheader>Status</ListSubheader>
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    <div
                                        style={{
                                            backgroundColor:
                                                getStatusColor(status)
                                                    .backgroundColor,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            borderRadius: 32,
                                            padding: "4px 15px 4px 10px", // top right bottom left
                                        }}
                                    >
                                        <CircleIcon
                                            style={{
                                                color: getStatusColor(status)
                                                    .iconColor,
                                                fontSize: "14px",
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
                                            borderRadius: 8,
                                            padding: "4px 15px 4px 10px", // top right bottom left
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
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleTaskForm}
                        style={{ height: "50px", padding: "8px" }}
                    >
                        New Item
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default ControlBar;
