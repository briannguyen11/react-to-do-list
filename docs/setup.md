
## Development Environment Setup

### Prerequisites
Ensure you have the following installed on your workstation:
- **Node.js**: Check if Node.js is installed by running:
  ```bash
  node -v
  ```
  If not installed, download and install Node.js from [here](https://nodejs.org/).

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd react-frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd ../express-backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a .env file for database connection:
   ```bash
   touch .env
   ```
3. Fill out .env file with database information:
   ```
   # MONGO_USER=<user>
   # MONGO_PWD=<pwd>
   # MONGO_DB=<db>
   # MONGO_CLUSTER=<cluster> 
   ```
   You will need to ask for the proper credentials to run the project
3. Start the backend server:
   ```bash
   npm run start
   ```
   
### Root (General) Environment
1. Install root dependencies:
   ```bash
   npm install
   ```
   
### Linting and Formatting
- To run ESLint and Prettier for the entire project, use:
  ```bash
  npm run format
  ```
---
