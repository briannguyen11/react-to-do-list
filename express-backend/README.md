# Backend

<details>
<summary>Endpoints</summary>
<p>

-   Root: "/"
    -   GET: returns "Hello World"
-   Users: "/users"
    -   GET:
        -   Accepts user (this is username) from **query**
        -   Retrieves specified user or all if none specified
    -   POST:
        -   Accepts representation of user from **body**
        -   Attempts to add user to database
-   Users with id: "/users/id:"
    -   GET:
        -   Accepts id of **user** from **params** and optional task fields from **query**
            -   Only one filter at a time, works with status, date, category and flagged
        -   Returns a subset of the users task list filtered by task fields
    -   POST:
        -   Accepts id of **user** from **params** and task to add from **body**
        -   Attempts to add task to user
    -   DELETE:
        -   Accepts id of **user** from **params** and id of **existing task** from **query**
        -   Attempts to delete task from task list and remove from user tasks field
-   Tasks: "/tasks

    -   **Probably needs to change**
        -   Need to figure out if this is even used or if it's done through user task list
        -   "user" field probably needs to be removed since it's duplicate information
    -   GET:
        -   Accepts "user", "categories", "date", "flagged" and "completed" from **query**
        -   Retrieves tasks, can be filtered by user as well as user and other field
    -   POST: - Accepts representation of task from **body** - Attempts to add the task to database
    </p>
    </details>
    <details>
    <summary>Models</summary>
    <p>

-   User:
    -   username:
        -   String, required
    -   password:
        -   String, required
    -   tasks:
        -   List of task ids, ids not required
-   Task
    -   user: **PROBABLY REMOVE SINCE DUPLICATION WHEN USER TASK LIST POPULATED**
        -   String, required
    -   title:
        -   String, required
    -   description:
        -   String, required
    -   categories:
        -   List of strings, categories not required
    -   date: **CURRENTLY STRING, NEEDS TO BE DATE TYPE**
        -   String, required
    -   flagged:
        -   Boolean, required
    -   completed: - String, required
    <p>
    </details>
