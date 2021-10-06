import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiCreateUser(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const userResponse = await UsersDAO.signUpUser(email, password);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
