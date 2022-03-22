import { assert } from "chai";
import { placetimeService } from "./placetime-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, dublin, testPlaces } from "../fixtures.js";

suite("place API tests", () => {

    let user = null;

    setup(async () => {
      await placetimeService.deleteAllPlaces();
      await placetimeService.deleteAllUsers();
      user = await placetimeService.createUser(maggie);
      dublin.userid = user._id;
    });

  teardown(async () => {});

  test("create place", async () => {
    const returnedPlace = await placetimeService.createPlace(dublin);
    assert.isNotNull(returnedPlace);
    assertSubset(dublin, returnedPlace);
  });

  test("delete a place", async () => {
    const place = await placetimeService.createPlace(dublin);
    const response = await placetimeService.deletePlace(place._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlace = await placetimeService.getPlace(place.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Place with this id", "Incorrect Response Message");
    }
  });

  test("create multiple places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
        testPlaces[i].userid = user._id;
        // eslint-disable-next-line no-await-in-loop
        await placetimeService.createPlace(testPlaces[i]);
      }
      let returnedLists = await placetimeService.getAllPlaces();
      assert.equal(returnedLists.length, testPlaces.length);
      await placetimeService.deleteAllPlaces();
      returnedLists = await placetimeService.getAllPlaces();
      assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant place", async () => {
    try {
        const response = await placetimeService.deletePlace("not an id");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No Place with this id", "Incorrect Response Message");
      }
  });
});