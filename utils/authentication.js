const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authentication = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "DACNTT2", async (err, decoded) => {
      if (err) {
        reject("Token không hợp lệ");
      } else {
        const user = await User.findOne({ phone_number: decoded.phone_number });
        if (!user) {
          reject("Không tìm thấy người dùng");
        }
        resolve(user);
      }
    });
  });
};

module.exports = authentication;
