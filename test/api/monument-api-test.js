import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placetimeService } from "./placetime-service.js";
import { maggie, maggieCredentials, dublin, testPlaces, testMonuments, newbridge } from "../fixtures.js";

suite("Monument API tests", () => {
  let user = null;
  let dublinMonuments = null;

  setup(async () => {
    placetimeService.clearAuth();
    user = await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggieCredentials);
    await placetimeService.deleteAllPlaces();
    await placetimeService.deleteAllMonuments();
    await placetimeService.deleteAllUsers();
    user = await placetimeService.createUser(maggie);
    await placetimeService.authenticate(maggieCredentials);
    dublin.userid = user._id;
    dublinMonuments = await placetimeService.createPlace(dublin);
  });

  teardown(async () => {});

  test("create monument", async () => {
    const returnedMonument = await placetimeService.createMonument(dublinMonuments._id, newbridge);
    assertSubset(newbridge, returnedMonument);
  });

  test("create Multiple monuments", async () => {
    for (let i = 0; i < testMonuments.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await placetimeService.createMonument(dublinMonuments._id, testMonuments[i]);
      }
      const returnedMonuments = await placetimeService.getAllMonuments();
      assert.equal(returnedMonuments.length, testMonuments.length);
      for (let i = 0; i < returnedMonuments.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const monument = await placetimeService.getMonument(returnedMonuments[i]._id);
        assertSubset(monument, returnedMonuments[i]);
      }
  });

  test("Delete MonumentApi", async () => {
    for (let i = 0; i < testMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placetimeService.createMonument(dublinMonuments._id, testMonuments[i]);
    }
    let returnedMonuments = await placetimeService.getAllMonuments();
    assert.equal(returnedMonuments.length, testMonuments.length);
    for (let i = 0; i < returnedMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const monument = await placetimeService.deleteMonument(returnedMonuments[i]._id);
    }
    returnedMonuments = await placetimeService.getAllMonuments();
    assert.equal(returnedMonuments.length, 0);
  });

  test("test denormalised Place", async () => {
    for (let i = 0; i < testMonuments.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await placetimeService.createMonument(dublinMonuments._id, testMonuments[i]);
      }
      console.log("dublin Monumanets is :", dublinMonuments)
      const returnedPlace = await placetimeService.getPlace(dublinMonuments._id);
      assert.equal(returnedPlace.monuments.length, testMonuments.length);
      for (let i = 0; i < testMonuments.length; i += 1) {
        assertSubset(testMonuments[i], returnedPlace.monuments[i]);
      }
  });
});