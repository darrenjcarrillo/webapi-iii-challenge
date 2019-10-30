const express = require("express");

const router = express.Router();
const userDb = require("./userDb");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  let { id } = req.params;
  if (id) {
    id = req.user;
  } else if (!id) {
  }

  next();
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
// module.exports = validateUserId;
// module.exports = validateUser;
// module.exports = validatePost;
