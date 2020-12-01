const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connect to mongodb..");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
