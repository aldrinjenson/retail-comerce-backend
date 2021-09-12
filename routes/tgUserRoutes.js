const express = require("express");
const { TgUserContorller } = require("../controllers");
const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req;
  res.send(await TgUserContorller.getTgUser(query));
});

router.patch("/", async (req, res) => {
  const { body: tgUser } = req;
  res.send(await TgUserContorller.addTgUser(tgUser));
});

module.exports.tgUserRouter = router;
