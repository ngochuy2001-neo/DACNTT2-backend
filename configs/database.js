const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dacntt2",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Kết nối MongoDB thành công");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connect };
