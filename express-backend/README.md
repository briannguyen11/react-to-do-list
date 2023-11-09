# Backend
<details>
<summary>Endpoints</summary>
<p>

- Root: "/"
  - GET: returns "Hello World"
- Users: "/users"
  - GET:
    - Accepts "user" from **query**
    - Retrieves specified user or all if none specified
  - POST:
    - Accepts representation of user from **body**
    - Attempts to add user to database
- Users with id: "/users/id:"
  - PATCH:
    - Accepts "id" of **user** from **params**
    - Retrieves _id field of **existing task** from **body**
    - Attempts to add task to user 
  - DELETE:
    - Accepts "id" of **user** from **params**
    - Retrieves _id field of **existing task** from **body**
    - Attempts to delete task from task list and remove from user tasks field
- Tasks: "/tasks
  - **Probably needs to change**
    - Need to figure out if this is even used or if it's done through user task list
    - "user" field probably needs to be removed since it's duplicate information
  - GET:
    - Accepts "user", "categories", "date", "flagged" and "completed" from **query**
    - Retrieves tasks, can be filtered by user as well as user and other field
  - POST:
    - Accepts representation of task from **body**
    - Attempts to add the task to database
- Users and Tasks: "/usersAndTasks"
  - GET:
    - Accepts "user" from "query"
      - Change to use id?
    - Retrieves specified user or all and populates user task fields
</p>
</details>
<details>
<summary>Models</summary>
<p>

- User:
  - username:
    - String, required
  - password:
    - String, required
  - tasks:
    - List of task ids, ids not required
- Task
  - user: **PROBABLY REMOVE SINCE DUPLICATION WHEN USER TASK LIST POPULATED**
    - String, required
  - title:
    - String, required
  - description:
    - String, required
  - categories:
    - List of strings, categories not required
  - date: **CURRENTLY STRING, NEEDS TO BE DATE TYPE**
    - String, required
  - flagged:
    - Boolean, required
  - completed: **POTENTIALLY CHANGE TO NON-BOOLEAN FOR MORE THAN 2 STATES**
    - Boolean, required
<p>
</details>
