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
/*
  test("delete all Monuments", async () => {
    let returnedMonuments = await db.MonumentStore.getAllMonuments();
    assert.equal(returnedMonuments.length, 3);
    await db.MonumentStore.deleteAllMonuments();
    returnedMonuments = await db.MonumentStore.getAllMonuments();
    assert.equal(returnedMonuments.length, 0);
  });

  test("get a Monument - success", async () => {
    const Monument = await db.MonumentStore.addMonument(newbridge);
    const returnedMonument = await db.MonumentStore.getMonumentById(Monument._id);
    assert.equal(newbridge, Monument);
    
  });

  test("delete One Monument - success", async () => {
    const id = testMonuments[0]._id;
    await db.MonumentStore.deleteMonumentById(id);
    const returnedMonuments = await db.MonumentStore.getAllMonuments();
    assert.equal(returnedMonuments.length, testMonuments.length - 1);
    const deletedMonument = await db.MonumentStore.getMonumentById(id);
    assert.isNull(deletedMonument);
  });

  test("get a Monument - bad params", async () => {
    assert.isNull(await db.MonumentStore.getMonumentById(""));
    assert.isNull(await db.MonumentStore.getMonumentById());
  });

  test("delete One Monument - fail", async () => {
    await db.MonumentStore.deleteMonumentById("bad-id");
    const allMonuments = await db.MonumentStore.getAllMonuments();
    assert.equal(testMonuments.length, allMonuments.length);
  });
  */
});