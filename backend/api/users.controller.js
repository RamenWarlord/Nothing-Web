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

  static async apiLoginUser(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const loginResponse = await UsersDAO.loginUser(email, password);
      //null=server error, -1=userdne, 0=incorrectpw, 1=correctpw
      if (loginResponse == null) {
        res.json({ status: "server error" });
      } else {
        switch (loginResponse) {
          case -1:
            res.json({ status: "User dne" });
          case 0:
            res.json({ status: "Password incorrect" });
          case 1:
            res.json({ status: "Password correct" });
          default:
            res.json({
              status:
                "Honestly shouldnt get to this point but something went wrong",
            });
        }
      }
      //return loginResponse;
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
