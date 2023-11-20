// userService.test.js

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
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
    // Write your tests for userService functions here
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

describe("addTaskToUser", () => {
    // Write your tests for userService functions here
    test("Should add a new task to a user", async () => {
        const userToUpdate = await userServices.findOneUserByName("ejendret");

        const userId = userToUpdate._id;

        const taskToAdd = {
            title: "Test Task",
            description: "Testing ability to add a task",
            category: "Personal",
            date: new Date("2023-11-19T05:00:00.000Z"),
            flagged: false,
            status: "In progress",
        };

        const initial_length = userToUpdate.tasks.length;

        const addedTaskId = await userServices.addTaskToUser(userId, taskToAdd);

        // Test that task was created
        expect(addedTaskId).not.toBe(-1);

        const addedTask = await taskServices.findTaskById(addedTaskId);

        const updatedUser = await userServices.findOneUserByName("ejendret");

        // Test that length has been updated
        expect(updatedUser.tasks.length).toBeGreaterThan(initial_length);

        // Test that fields match
        expect(addedTask.title).toBe(taskToAdd.title);
        expect(addedTask.description).toBe(taskToAdd.description);
        expect(addedTask.category).toBe(taskToAdd.category);
        expect(addedTask.date).toStrictEqual(taskToAdd.date);
        expect(addedTask.flagged).toBe(taskToAdd.flagged);
        expect(addedTask.status).toBe(taskToAdd.status);
    });
});
