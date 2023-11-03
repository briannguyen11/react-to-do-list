import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function TaskForm(props) {
  const [task, setTask] = useState({
    user: "",
    title: "",
    category: "",
    description: "",
    date: new Date(),
    flagged: false,
    completed: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") setTask({ title: value });
    else if (name === "category") setTask({ category: value });
    else if (name === "description") setTask({ description: value });
  }

  function SelectCategory() {
    return (
      <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={task.category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"home"}>Home</MenuItem>
          <MenuItem value={"school"}>School</MenuItem>
          <MenuItem value={"sports"}>Sports</MenuItem>
        </Select>
      </FormControl>
    );
  }

  function DatePicker() {
    const [value, setDate] = React.useState(dayjs("2022-04-17"));
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setDate(newValue)}
        />{" "}
      </LocalizationProvider>
    );
  }

  function submitForm() {
    props.handleSubmit(task);
    setTask({ title: "", category: "", description: "" });
  }

  return (
    <form>
      <TextField
        label="Title"
        variant="filled"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <SelectCategory />
      <TextField
        label="Description"
        variant="filled"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <DatePicker />
      <Button onClick={submitForm} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default TaskForm;
