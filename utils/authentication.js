const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authentication = async (token) => {
  try {
    if (!token) {
      throw new Error("Không có token");
    }

    const decoded = jwt.verify(token, "DACNTT2"); // Giải mã token
    const user = await User.findOne({ phone_number: decoded.phone_number });

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    return {
      _id: user._id,
      name: user.user_name,
      phone_number: user.phone_number,
      email: user.email,
      is_admin: user.is_admin,
    };
  } catch (error) {
    console.log("Lỗi xác thực:", error.message);
    return null; 
  }
};

module.exports = authentication;
