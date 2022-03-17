import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/monuments.json"));
db.data = { monuments: [] };

export const monumentJsonStore = {
    async getAllMonuments() {
        await db.read();
        return db.data.monuments;
    },

    async addMonument(monument) {
        await db.read();
        monument._id = v4();
        db.data.monuments.push(monument);
        await db.write();
        return monument;
    },

    async getUserMonuments(userid) {
        await db.read();
        return db.data.monuments.filter((monument) => monument.userid === userid); 
    },

    async deleteMonumentById(id) {
        await db.read();
        const index = db.data.monuments.findIndex((monument) => monument._id === id);
        db.data.monuments.splice(index, 1);
        await db.write();
    },

    async deleteAllMonuments() {
        db.data.monuments = [];
        await db.write();
    },

    async getMonumentById(id) {
        await db.read();
        const list = db.data.monuments.find((monument) =>  monument._id === id);
        return list;
    }
}

