import express from "express";
import UsersCtrl from "./users.controller.js";

const router = express.Router();

router.route("/signup").post(UsersCtrl.apiCreateUser);

export default router;
