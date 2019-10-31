const express = require("express");

const router = express.Router();
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

/// 1 Done

router.post("/", validateUser, (req, res) => {
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

/// 2

router.post("/:id/posts", validateUserId, (req, res) => {
  const messageInfo = { ...req.body, user_id: req.params.id };

  postDb
    .insert(messageInfo)
    .then(post => {
      console.log(`Comment Posted`, post);
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

/// 3 Done
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
/// 4 Done

router.get("/:id", validateUserId, (req, res) => {
  userDb
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user"
      });
    });
});

/// 5 DONE

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id, req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

/// 6 DONE
router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  userDb.remove(id).then(post => {
    res.status(200).json({
      message: `user with id of ${id} deleted`,
      post
    });
  });
});

/// 7 DONE
router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  if (!req.body.name) {
    res.status(400).json({
      errorMessage: "Please provide a name."
    });
  } else {
    userDb.update(id, req.body).then(updatePost => {
      console.log(updatePost);
      res.status(200).json(updatePost);
    });
  }
});

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

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing user data"
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required text field"
    });
  } else {
    req.body;
    next();
  }
}

function validatePost(req, res, next) {
  const posts = req.body;
  if (!posts.user_id) {
    res.status(400).json({ message: "missing post data" });
  } else if (!posts.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    // userDb.insert(posts).then(post => {
    //   post;
    // });
    req.body;
    next();
  }
}

module.exports = router;
// module.exports = validateUserId;
// module.exports = validateUser;
// module.exports = validatePost;
