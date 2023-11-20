// userService.test.js

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
// import taskServices from "./models/task-services.js";
import userServices from "./models/user-services.js";

console.log("HEY");

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
