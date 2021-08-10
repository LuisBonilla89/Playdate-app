// Dependencies
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

// Relatives
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const pubSub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub }),
});

mongoose
  .connect(process.env.MONGODB_URI || MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("😃 You are connected to MongoDB");
    return server.listen({ port: PORT });
  })
  .then((res) => console.log(` 🚀🚀🚀 The server is  running at ${res.url}`))
  .catch((err) => console.log(`Error Starting Server => ${err}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
