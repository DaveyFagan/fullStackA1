import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placetimeService } from "./placetime-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    placetimeService.clearAuth();
    await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggie);
    await placetimeService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await placetimeService.createUser(testUsers[i]);
    }
    await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggie);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await placetimeService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await placetimeService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placetimeService.deleteAllUsers();
    await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggie);
    returnedUsers = await placetimeService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await placetimeService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await placetimeService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await placetimeService.deleteAllUsers();
    await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggie);
    try {
      const returnedUser = await placetimeService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});