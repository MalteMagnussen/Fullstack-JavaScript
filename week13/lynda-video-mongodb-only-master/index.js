import express from "express";
import graphqlHTTP from "express-graphql";
//import schema from "./data/schema"
import { schema } from "./data/schema";
//import resolvers from "./resolversOriginal"
const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is amazing!");
});

//const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    //rootValue: root,
    graphiql: true, // For testing
  })
);

app.listen(8080, () => console.log("Running server on port localhost:8080"));
