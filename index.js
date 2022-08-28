import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import db from "./config/db.js";
import cors from "cors";
const port = process.env.PORT || 5000;

const app = express();

dotenv.config();
//connect to db
db();
app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
  })
);

//
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
