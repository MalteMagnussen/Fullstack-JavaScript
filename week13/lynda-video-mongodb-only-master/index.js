import express from "express";
import graphqlHTTP from "express-graphql";
//import schema from "./data/schema"
import { schema } from "./data/schema";
import cors from "cors";
//import resolvers from "./resolversOriginal"
const app = express();
app.use(cors());
/*
THIS IS THE "OUTER" LAYER
TO GO DEEPER, GO TO SCHEMA.JS IN DATA FOLDER.
*/

app.get("/", (req, res) => {
  res.send("GraphQL is amazing!");
});

//const root = resolvers;

// GraphQL only uses ONE endpoint. Very smart.
app.use(
  "/graphql",
  graphqlHTTP({
    // Middleware for express;
    // takes an options object or function as input to configure behavior,
    // and returns an express middleware.
    schema: schema,
    //rootValue: root,
    graphiql: true, // For testing
  })
);

app.listen(8080, () => console.log("Running server on port localhost:8080"));
