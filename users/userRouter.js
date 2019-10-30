const express = require("express");

const router = express.Router();
const userDb = require("./userDb");

router.post("/", (req, res) => {
  userDb
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding user"
      });
    });
});

// router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {});

router.get("/", (req, res) => {
  userDb
    .get(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user"
      });
    });
});

// router.get("/:id/posts", validatePost(), (req, res) => {

// });

// router.delete("/:id", validateUserId(), (req, res) => {});

// router.put("/:id", validateUserId(), (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user.id) {
        user.id = req.user;
        next();
      } else {
        res.status(400).json({
          message: "invalid user id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error cannot process request"
      });
    });
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
// module.exports = validateUserId;
// module.exports = validateUser;
// module.exports = validatePost;
