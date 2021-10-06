import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.render();
});

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

app.listen(3000);
export default app;
