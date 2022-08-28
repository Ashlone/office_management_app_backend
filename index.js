import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import db from "./config/db.js";
import cors from "cors";
import path from "path";
const port = process.env.PORT || 5000;

const app = express();
const dirname = path.resolve();

dotenv.config();
//connect to db
db();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.use(express.static(path.join(dirname, "/client/build")));
//
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "/client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
