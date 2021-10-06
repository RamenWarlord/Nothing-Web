import express from "express";
import cors from "cors";
import users from "./api/users.route.js";
import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", users);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

/*
app.get("/users", async (req, res) => {
  res.json(users);
});

//create user
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

//login user
app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.status(500).send();
  }
});
*/
app.listen(3000);
export default app;
