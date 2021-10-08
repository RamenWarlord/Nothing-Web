import express from "express";
import UsersCtrl from "./users.controller.js";

const router = express.Router();

router.route("/signup").post(UsersCtrl.apiCreateUser);
router.route("/login").get(UsersCtrl.apiLoginUser);

export default router;
