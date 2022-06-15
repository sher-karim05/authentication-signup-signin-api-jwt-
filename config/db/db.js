const mongoose = require("mongoose");

const connetDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is Connected ✅", connect);
  } catch (error) {
    console.log(error.message);
  }
};
let data = mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    return err.message;
  } else {
    console.log("connected with database");
  }
});
module.exports = connetDB;
