import { assert } from "chai";
import { placetimeService } from "./placetime-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    placetimeService.clearAuth();
    await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggie);
    await placetimeService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await placetimeService.createUser(maggie);
    const response = await placetimeService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placetimeService.createUser(maggie);
    const response = await placetimeService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});