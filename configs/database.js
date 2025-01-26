const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL_URL);
    console.log("Connect database successfully")
  } catch (error) {
    console.log(error);
  }
}

module.exports = {connect}