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
    const user = await users.find({ email: "chungusamong@big.com" });
    console.log(users.find({}));
    if (user.email === undefined) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = { email: email, password: hashedPassword };
        //return await users.insertOne(newUser);
      } catch (e) {
        console.error(`unable to sign up user: ${e}`);
        return { error: e };
      }
    } else console.log("user exists");
  }

  static async loginUser(email, password) {
    const user = users.find((user) => user.email === email);
    if (user.email === undefined) {
      //-1 = user dne
      return -1;
    } else {
      try {
        if (await bcrypt.compare(password, user.password)) {
          //1 = correct pw
          return 1;
        } else {
          //0 = inccorect pw
          return 0;
        }
      } catch {
        //null = server error
        return null;
      }
    }
  }
}
