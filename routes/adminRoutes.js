const express = require("express");
const { AdminController } = require("../controllers");
const router = express.Router();

router.post("/", async (req, res) => {
  const { body: admin } = req;
  res.send(await AdminController.addAdmin(admin));
});

module.exports.adminRouter = router;
