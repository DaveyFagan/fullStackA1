import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/admin.json"));
db.data = { adminUsers: [] };

export const adminJsonStore = {


  async getAdminUserByEmail(email) {
    await db.read();
    let u = db.data.adminUsers.find((adminUser) => adminUser.email === email);
    if (u === undefined) u = null;
    return u;
  },

};