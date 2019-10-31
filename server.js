const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
// import custom middleware
// const validateUserId = require()
// const validateUser
// const validatePost

//custom middleware

function logger(prefix) {
  return (req, res, next) => {
    console.log(
      `LOGGER IS ON ${prefix} ${req.method} to ${
        req.url
      } at [${new Date().toISOString()}]`
    );

    next();
  };
}

server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));
// server.use(logger);

server.get("/", logger(" Logger on /"), (req, res) => {
  // res.send(`<h2>Let's write some middleware!</h2>`);
  res.status(200).json({ message: "logger is on" });
});

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
