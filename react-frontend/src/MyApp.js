import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import TaskForm from "./TaskFrom";
import TaskTable from "./TaskTable";
// import axios from "axios";

function MyApp() {
  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid xs={6} md={8}>
          <h1>To Do List</h1>
          <TaskTable />
        </Grid>
        <Grid xs={6} md={4}>
          <h1>Add New Task</h1>
          <TaskForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default MyApp;
