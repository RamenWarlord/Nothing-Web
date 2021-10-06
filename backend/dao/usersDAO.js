import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.SERVER_NS).collection("users");
    } catch (e) {
      console.error(`Unable to establish connection handle in UsersDAO: ${e}`);
    }
  }
}
