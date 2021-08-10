// Dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const path = require("path");

// Relatives
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();

const pubSub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }),
});

server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// db.once("open", () => {
//   app.listen(PORT, () => {
//     console.log(`API running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });

mongoose
  .connect(process.env.MONGODB_URI || MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("😃 You are connected to MongoDB");
    return app.listen({ port: PORT });
  })
  .then((res) => console.log(` 🚀🚀🚀 The server is  running at ${PORT}`))
  .catch((err) => console.log(`Error Starting Server => ${err}`));
