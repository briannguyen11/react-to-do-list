// userService.test.js

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
// import { jest } from "@jest/globals";
// import taskModel from "./models/task.js";
import taskServices from "./models/task-services.js";
import userServices from "./models/user-services.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.ensureInstance();
    const mongoUri = await mongoServer.getUri();

    // Connect to the in-memory database
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Disconnect and stop the in-memory database after all tests are done
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("addUser", () => {
    test("Should add a new user to database", async () => {
        const userToAdd = {
            email: "ejendret",
            password: "secret",
            tasks: [],
        };

        const result = await userServices.addUser(userToAdd);

        const retrievedUser = await userServices.findUserById(result.userId);

        // Expect a successful addUser
        expect(result.status).toBe("success");

        // Check that added user matches expected
        expect(retrievedUser.email).toBe(userToAdd.email);
        expect(retrievedUser.password).toBe(userToAdd.password);
        expect(retrievedUser.tasks).toStrictEqual(userToAdd.tasks);
    });

    test("Should refrain from adding an existing user to database", async () => {
        const userToAdd = {
            email: "ejendret",
            password: "secret",
            tasks: [],
        };

        const initial = await userServices.getUsers();

        const initial_length = initial.length;

        const status = await userServices.addUser(userToAdd);

        // Expect status to be exists
        expect(status.status).toBe("exists");

        // Expect user list to have not changed in length
        const result = await userServices.getUsers();

        expect(result).toHaveLength(initial_length);
    });
});

describe("validateUser", () => {
    test("Should return nonexistent if user cannot be found", async () => {
        const userToValidate = {
            email: "nonsense",
            password: "secret",
            tasks: [],
        };

        const result = await userServices.validateUser(userToValidate);

        // Expect a nonexistent status
        expect(result.status).toBe("nonexistent");
    });

    test("Should return invalid if user is found but password doesn't match", async () => {
        const userToValidate = {
            email: "ejendret",
            password: "nonsense",
            tasks: [],
        };

        const result = await userServices.validateUser(userToValidate);

        // Expect an invalid status
        expect(result.status).toBe("invalid");
    });

    test("Should return nonexistent if user cannot be found", async () => {
        const userToValidate = {
            email: "ejendret",
            password: "secret",
            tasks: [],
        };

        const result = await userServices.validateUser(userToValidate);

        // Expect a successful status
        expect(result.status).toBe("valid");
    });
});

describe("addTaskToUser", () => {
    test("Should add a new task to a user", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const userId = userToUpdate._id;

        const taskToAdd = {
            title: "Test Task",
            description: "Testing ability to add a task",
            category: "Personal",
            date: new Date("2023-11-19T05:00:00.000Z"),
            flagged: false,
            status: "In Progress",
        };

        const initial_length = userToUpdate.tasks.length;

        const updatedUser = await userServices.addTaskToUser(userId, taskToAdd);

        const addedTaskId = updatedUser.tasks[0].toString();

        // Test that task was created
        expect(addedTaskId).not.toBe(-1);

        const addedTask = await taskServices.findTaskById(addedTaskId);

        // Test that length has been updated
        expect(updatedUser.tasks.length).toBeGreaterThan(initial_length);

        expect(updatedUser.tasks.includes(addedTaskId)).toBeTruthy();

        // Test that fields match
        expect(addedTask.title).toBe(taskToAdd.title);
        expect(addedTask.description).toBe(taskToAdd.description);
        expect(addedTask.category).toBe(taskToAdd.category);
        expect(addedTask.date).toStrictEqual(taskToAdd.date);
        expect(addedTask.flagged).toBe(taskToAdd.flagged);
        expect(addedTask.status).toBe(taskToAdd.status);
    });
});

describe("updateTask", () => {
    test("Should fail if taskId is invalid", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const taskId = "653c0457a363dec30256a986";

        const updateTask = {
            title: "Test Task",
            description: "Testing ability to update a task",
            category: "Personal",
            date: new Date("2023-11-19T05:00:00.000Z"),
            flagged: true,
            status: "In Progress",
        };

        const initial_length = userToUpdate.tasks.length;

        const updatedTask = await taskServices.updateTask(taskId, updateTask);

        const updatedUser = await userServices.findOneUserByName("ejendret");

        // Test that length hasn't changed
        expect(updatedUser.tasks.length).toBe(initial_length);

        // Check that invalid taskId is not in task
        expect(updatedUser.tasks.includes(taskId)).toBeFalsy();

        // Check that attempted update is null
        expect(updatedTask).toBe(null);
    });

    test("Should fail if task is not defined", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const taskId = userToUpdate.tasks[0];

        const updateTask = null;

        const initial_length = userToUpdate.tasks.length;

        const updatedTask = await taskServices.updateTask(taskId, updateTask);

        const updatedUser = await userServices.findOneUserByName("ejendret");

        // Test that length hasn't changed
        expect(updatedUser.tasks.length).toBe(initial_length);

        // Check that attempted update is null
        expect(updatedTask).toBe(null);
    });

    test("Should update an existing task", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const taskId = userToUpdate.tasks[0].toString();

        const updateTask = {
            title: "Test Task",
            description: "Testing ability to update a task",
            category: "Personal",
            date: new Date("2023-11-19T05:00:00.000Z"),
            flagged: true,
            status: "In Progress",
        };

        const initial_length = userToUpdate.tasks.length;

        const updatedTask = await taskServices.updateTask(taskId, updateTask);

        const updatedUser = await userServices.findOneUserByName("ejendret");

        // Test that length hasn't changed
        expect(updatedUser.tasks.length).toBe(initial_length);

        // Check that taskId is still in user list
        expect(updatedUser.tasks.includes(taskId)).toBeTruthy();

        // Test that fields match
        expect(updatedTask.title).toBe(updateTask.title);
        expect(updatedTask.description).toBe(updateTask.description);
        expect(updatedTask.category).toBe(updateTask.category);
        expect(updatedTask.date).toStrictEqual(updateTask.date);
        expect(updatedTask.flagged).toBe(updateTask.flagged);
        expect(updatedTask.status).toBe(updateTask.status);
    });
});

describe("deleteTaskFromUser", () => {
    test("Should fail if userId is invalid", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const userId = "653c0457a363dec30256a986";

        const taskId = userToUpdate.tasks[0].toString();

        const initial_length = userToUpdate.tasks.length;

        const updatedUser = await userServices.deleteTaskFromUser(
            userId,
            taskId
        );

        expect(updatedUser).toBe(null);

        const attemptedUser = await userServices.findOneUserByName("ejendret");

        expect(attemptedUser.tasks.length).toBe(initial_length);
        expect(attemptedUser.tasks.includes(taskId)).toBeTruthy();
    });

    test("Should also fail if taskId is invalid", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const userId = userToUpdate._id;

        const taskId = "653c0457a363dec30256a986";

        const initial_length = userToUpdate.tasks.length;

        const updatedUser = await userServices.deleteTaskFromUser(
            userId,
            taskId
        );

        expect(updatedUser).toBe(null);

        const attemptedUser = await userServices.findOneUserByName("ejendret");

        expect(attemptedUser.tasks.length).toBe(initial_length);
        expect(
            attemptedUser.tasks.includes(userToUpdate.tasks[0].toString())
        ).toBeTruthy();
    });

    test("Should remove a task from a user", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const userId = userToUpdate._id;

        const taskId = userToUpdate.tasks[0].toString();

        const initial_length = userToUpdate.tasks.length;

        const updatedUser = await userServices.deleteTaskFromUser(
            userId,
            taskId
        );

        expect(updatedUser.tasks.length).toBeLessThan(initial_length);

        expect(updatedUser.tasks.includes()).toBeFalsy();
    });
});

describe("addTask", () => {
    it("should handle error when taskModel throws an error", async () => {
        // Testing with invalid tasks
        const taskOne = {
            title: "Test Task",
            description: "a",
            category: "Personal",
            date: new Date("2023-11-19T05:00:00.000Z"),
            flagged: true,
            status: "In Progress",
        };

        const taskTwo = {
            title: "a",
            description: "Testing with invalid tasks",
            category: "Personal",
            date: new Date("2023-11-19T05:00:00.000Z"),
            flagged: true,
            status: "In Progress",
        };

        const resultOne = await taskServices.addTask(taskOne);
        const resultTwo = await taskServices.addTask(taskTwo);

        // Expect return to be null
        expect(resultOne).toBe(null);
        expect(resultTwo).toBe(null);
    });
});
