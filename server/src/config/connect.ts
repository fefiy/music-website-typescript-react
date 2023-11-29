const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("database connected succefully"))
  .catch((err: any) => console.log(err));

export const db = mongoose.connection;
