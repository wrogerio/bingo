const { render } = require("ejs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/cartela", (req, res) => res.render("cartela"));

module.exports = router;
