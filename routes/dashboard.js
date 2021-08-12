const express = require("express");
const router = express.Router();
const verifyAuth = require("./verify/verifyauth");

router.get("/", verifyAuth, (req,res) => {
    
    // we got req.user from middleware by appending the username to request
    res.send(req.user);
});

module.exports.dashboard = router;