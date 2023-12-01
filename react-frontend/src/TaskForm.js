import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function TaskForm(props) {
  const [task, setTask] = useState({
    user: "",
    title: "",
    description: "",
    date: new Date(),
    flagged: false,
    completed: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") setTask({ title: value });
    else if (name === "description") setTask({ description: value });
  }

  function submitForm() {
    props.handleSubmit(task);
    setTask({ title: "", description: "" });
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
      <TextField
        label="Description"
        variant="filled"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={submitForm} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default TaskForm;
