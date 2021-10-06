import mongodb from "mongodb";
import bcrypt from "bcrypt";

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

  static async signUpUser(email, password) {
    const user = users.find((user) => user.email === email);
    if (user == null) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = { email: email, password: hashedPassword };
        return await users.insertOne(newUser);
      } catch (e) {
        console.error(`unable to sign up user: ${e}`);
        return { error: e };
      }
    }
    console.log("user exists");
  }
}
