import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    statuses,
    categories,
    getStatusColor,
    getCategoryColor,
} from "../styles/ButtonDesign";
import {
    TextField,
    Button,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import WindowIcon from "@mui/icons-material/Window";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CircleIcon from "@mui/icons-material/Circle";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function TitleInput({ name, value, onChange }) {
    const handleInputChange = (event) => {
        onChange({ target: { name, value: event.target.value } });
    };

    return (
        <TextField
            name={name}
            value={value}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            InputProps={{
                placeholder: "Untitled",
                sx: {
                    fontSize: "h3.fontSize",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif",
                    "& fieldset": {
                        border: "none", // Remove the TextField border
                    },
                },
            }}
            sx={{
                "& input::placeholder": {
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif",
                },
            }}
        />
    );
}

function SelectStatus({ name, value, onChange, statuses }) {
    const handleInputChange = (event) => {
        onChange({ target: { name, value: event.target.value } });
    };
    return (
        <Grid container spacing={2}>
            {/* Left side */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <ScatterPlotIcon sx={{ marginRight: "10px" }} />
                <p>Status</p>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={8}>
                <FormControl fullWidth>
                    <Select
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        IconComponent={() => null}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none", // Remove outline for outlined variant
                            },
                        }}
                    >
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
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

function SelectCategory({ name, value, onChange, categories }) {
    const handleInputChange = (event) => {
        onChange({ target: { name, value: event.target.value } });
    };
    return (
        <Grid container spacing={2}>
            {/* Left side */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <WindowIcon sx={{ marginRight: "10px" }} />
                <p>Category</p>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={8}>
                <FormControl fullWidth>
                    <Select
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        IconComponent={() => null}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none", // Remove outline for outlined variant
                            },
                        }}
                    >
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
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

function SelectDate({ name, value, onChange }) {
    const handleDateChange = (selectedDate) => {
        onChange({ target: { name, value: selectedDate } });
    };
    return (
        <Grid container spacing={2}>
            {/* Left side */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <CalendarMonthIcon sx={{ marginRight: "10px" }} />
                <p>Date</p>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={8}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    components={["MobileDatePicker"]}
                >
                    <MobileDatePicker
                        value={value}
                        onChange={handleDateChange}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none", // Remove outline for outlined variant
                            },
                        }}
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
}

function DescriptionInput({ name, value, onChange }) {
    const handleInputChange = (event) => {
        onChange({ target: { name, value: event.target.value } });
    };

    return (
        <Grid container spacing={2}>
            {/* Left side */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <SubjectIcon sx={{ marginRight: "10px" }} />
                <p>Description</p>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={8}>
                <TextField
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    maxRows={4} // Set the maximum number of rows
                    variant="outlined"
                    InputProps={{
                        placeholder: "Empty",
                        sx: {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none", // Remove outline for outlined variant
                            },
                            "&:focus-within": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "black", // Set the outline color when focused
                                },
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Add shadow effect on focus
                            },
                            width: "98%",
                        },
                    }}
                    sx={{
                        "& textarea": {
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            fontFamily: "Montserrat, sans-serif",
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
}

function SelectPrioirty({ name, value, onChange }) {
    const handleInputChange = (event) => {
        onChange({ target: { name, value: event.target.value } });
    };
    return (
        <Grid container spacing={2}>
            {/* Left side */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {value ? (
                    <BookmarkIcon sx={{ marginRight: "10px" }} />
                ) : (
                    <BookmarkBorderOutlinedIcon sx={{ marginRight: "10px" }} />
                )}
                <p>Prioirty</p>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={8}>
                <FormControl fullWidth>
                    <Select
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        IconComponent={() => null}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none", // Remove outline for outlined variant
                            },
                        }}
                    >
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

function TaskInfo({ taskId, toggleTaskInfo, handleSave }) {
    const [taskData, setTaskData] = useState(null);
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/tasks/${taskId}`
                );
                if (response.status === 200) {
                    setTaskData(response.data);
                }
            } catch (error) {
                console.error("An error occurred:", error.message);
            }
        };

        if (taskId) {
            fetchTaskData();
        }
    }, [taskId]);

    function handleChange(event) {
        const { name, value } = event.target;
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            [name]: value,
        }));
    }

    function updateTask() {
        handleSave(taskId, taskData);
        toggleTaskInfo();
    }

    return (
        <>
            {taskData && (
                <form>
                    <KeyboardDoubleArrowRightIcon onClick={toggleTaskInfo} />

                    <TitleInput
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                    />
                    <SelectStatus
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                        statuses={statuses}
                    />
                    <SelectCategory
                        name="category"
                        value={taskData.category}
                        onChange={handleChange}
                        categories={categories}
                    />
                    <SelectDate
                        name="date"
                        value={dayjs(taskData.date)}
                        onChange={handleChange}
                    />
                    <DescriptionInput
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                    />
                    <SelectPrioirty
                        name="flagged"
                        value={taskData.flagged}
                        onChange={handleChange}
                    />
                    <Button
                        onClick={updateTask}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </form>
            )}
        </>
    );
}

export default TaskInfo;
