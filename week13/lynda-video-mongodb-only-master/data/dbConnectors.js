const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
import mongoose from "mongoose";
const CONNECTION = process.env.CONNECTION; //"ADD YOUR OWN CONNECTION STRING"

// Mongoose helps make the Database Connection
mongoose.connect(CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

/*
Mongoose helps define Types.
*/
const friendSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  age: { type: Number },
  language: { type: String },
  email: { type: String },
  contacts: { type: Array },
});

const Friends = mongoose.model("Friend", friendSchema);
export { Friends };
