import app from "./app";
import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const DB = process.env.DATABASE?.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD || ""
// );

const DB = process.env.LOCAL_DATABASE;

if (!DB) {
  console.error("Database URL or password is not defined properly.");
  process.exit(1);
}

mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB connected successfully`);
  })
  .catch((error) => console.log("DB connection error: ", error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
