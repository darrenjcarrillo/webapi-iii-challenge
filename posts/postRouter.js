const express = require("express");

const router = express.Router();
const postDb = require("./postDb");

// 1 DONE
router.get("/", (req, res) => {
  postDb
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

// 2 DONE

router.get("/:id", validatePostId, (req, res) => {
  postDb
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

// 3 DONE
router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  postDb.remove(id).then(post => {
    res.status(200).json({
      message: `user with id of ${id} deleted`,
      post
    });
  });
});

// 4 DONE
router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Please provide a name."
    });
  } else {
    postDb.update(id, req.body).then(updatePost => {
      console.log(updatePost);
      res
        .status(200)
        .json({ message: `post with id of ${id} updated`, updatePost });
    });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  postDb
    .getById(id)
    .then(post => {
      if (post.id) {
        post.id = req.post;
        next();
      } else {
        res.status(400).json({
          message: "invalid post id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error cannot process request"
      });
    });
}

module.exports = router;
