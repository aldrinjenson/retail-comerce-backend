const express = require("express");
const { AdminController } = require("../controllers");
const router = express.Router();

router.get("/", async (req, res) => {
  const { body: query } = req;
  res.send(await AdminController.getAdmin(query));
});

router.post("/", async (req, res) => {
  const { body: admin } = req;
  res.send(await AdminController.addAdmin(admin));
});

router.post("/broadcast", async (req, res) => {
  const { body: payload } = req;
  res.send(await AdminController.broadcastToTgUsers(payload));
});

module.exports.adminRouter = router;
