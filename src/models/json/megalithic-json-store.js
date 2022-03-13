import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/megalithics.json"));
db.data = { megalithics: [] };

export const megalithicJsonStore = {
    async getAllMegalithicMonuments() {
        await db.read();
        return db.data.megalithics;
    },

    async addMegalithicMonument(megalithic) {
        await db.read();
        megalithic._id = v4();
        db.data.megalithics.push(megalithic);
        await db.write();
        return megalithic;
    },

    async getUserMegMonuments(userid) {
        await db.read();
        return db.data.megalithics.filter((megalithic) => megalithic.userid === userid); 
    },

    async deleteMegalithicMonumentById(id) {
        await db.read();
        const index = db.data.megalithics.findIndex((megalithic) => megalithic._id === id);
        db.data.megalithics.splice(index, 1);
        await db.write();
    },

    async deleteAllMegalithicMonuments() {
        db.data.megalithics = [];
        await db.write();
    },
}

