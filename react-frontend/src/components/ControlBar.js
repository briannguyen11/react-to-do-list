import React, { useState } from "react";
import { getStatusColor, getCategoryColor } from "../styles/ButtonDetails";
import { Button, MenuItem, Select, ListSubheader } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CircleIcon from "@mui/icons-material/Circle";

function FilterBar({ toggleTaskForm, onFilterChange, statuses, categories }) {
    const [selectedFilter, setSelectedFilter] = useState("");

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setSelectedFilter(value);
        onFilterChange(value === "" ? undefined : value);
    };

    return (
        <Grid container spacing={3}>
            <Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleTaskForm}
                >
                    Add New Item
                </Button>
            </Grid>
            <Grid>
                <Select
                    id="task-table-filter"
                    value={selectedFilter}
                    displayEmpty
                    onChange={handleFilterChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <ListSubheader>Status</ListSubheader>
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            <div
                                style={{
                                    backgroundColor:
                                        getStatusColor(status).backgroundColor,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    borderRadius: 32,
                                    padding: "4px 15px 4px 10px", // top right bottom left
                                }}
                            >
                                <CircleIcon
                                    style={{
                                        color: getStatusColor(status).iconColor,
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
                                    backgroundColor: getCategoryColor(category),
                                    borderRadius: 8,
                                    padding: "4px 15px 4px 10px", // top right bottom left
                                }}
                            >
                                {category}
                            </span>
                        </MenuItem>
                    ))}
                    <ListSubheader>Prioirty</ListSubheader>
                    <MenuItem value={true}>Flagged</MenuItem>
                    <MenuItem value={false}>Non-Flagged</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
}
export default FilterBar;
