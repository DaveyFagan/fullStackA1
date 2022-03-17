import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testMonuments, newbridge, dublin } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("Monument Model tests", () => {

    let monumentList = null;

  setup(async () => {
    db.init("");
    await db.placeStore.deleteAllPlaces();
    monumentList = await db.placeStore.addPlace(dublin)
    await db.monumentStore.deleteAllMonuments();
    for (let i = 0; i < testMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMonuments[i] = await db.monumentStore.addMonument(monumentList._id, testMonuments[i]);
    }
  });

  test("create a single Monument", async () => {
    const dublinList = await db.placeStore.addPlace(dublin)
    const monument = await db.monumentStore.addMonument(dublinList._id, newbridge);
    assert.isNotNull(monument._id);
    assertSubset (newbridge, monument);
  });

  test("create multiple monument test", async () => {
    const monuments = await db.placeStore.getPlaceById(monumentList._id);
    assert.equal(testMonuments.length, testMonuments.length)
  });

  test("delete all monument test", async () => {
    const monuments = await db.monumentStore.getAllMonuments();
    assert.equal(testMonuments.length, monuments.length);
    await db.monumentStore.deleteAllMonuments();
    const newMonuments = await db.monumentStore.getAllMonuments();
    assert.equal(0, newMonuments.length);
  });

  test("get a monument - success", async () => {
    const dublinList = await db.placeStore.addPlace(dublin);
    const monument = await db.monumentStore.addMonument(dublinList._id, newbridge)
    const newMonument = await db.monumentStore.getMonumentById(monument._id);
    assertSubset (newbridge, newMonument);
  });

});