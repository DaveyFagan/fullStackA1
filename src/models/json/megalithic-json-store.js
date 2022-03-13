import { v4 } from "uuid";
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/megalithics.json"));
db.data = { megalithics: [] };

export const megalithicJsonStore = {
    async getAllMegalithics() {
        await db.read();
        return db.data.megalithics;
    },

    async addMegalithic(megalithic) {
        await db.read();
        megalithic._id = v4();
        db.data.megalithics.push(megalithic);
        await db.write();
        return megalithic;
    },
}

