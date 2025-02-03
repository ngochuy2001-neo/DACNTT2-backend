const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  async create(req, res) {
    const { email, user_name, phone_number, password } = req.body;
    if (!email || !phone_number || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    try {
      console.log(req.body);
      const existingUser = await User.findOne({
        $or: [{ email }, { phone_number }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "Người dùng đã tồn tại" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email: email,
        user_name: user_name,
        phone_number,
        password: hashedPassword,
      });
      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          phone_number: newUser.phone_number,
          is_admin: newUser.is_admin,
          is_shipper: newUser.is_shipper,
          name: newUser.user_name,
          phone_number: newUser.phone_number,
          email: newUser.email,
        },
        "DACNTT2",
        { expiresIn: "5d" }
      );

      res.status(201).json({ message: "Đăng ký thành công", token });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    const { phone_number, password } = req.body;
    console.log(req.body);
    if (!phone_number || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    try {
      const user = await User.findOne({ phone_number: phone_number });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Không tìm thấy người dùng này" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }
      const token = jwt.sign(
        {
          id: user._id,
          is_admin: user.is_admin,
          is_shipper: user.is_shipper,
          name: user.user_name,
          phone_number: user.phone_number,
          email: user.email,
        },
        "DACNTT2",
        { expiresIn: "1d" }
      );
      res.json({
        message: "Đăng nhập thành công",
        token: token,
        user: {
          id: user._id,
          user_name: user.user_name,
          phone_number: user.phone_number,
          email: user.email,
          is_admin: user.is_admin,
          is_shipper: user.is_shipper,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  }

  async authorize(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "DACNTT2", async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }
      const user = await User.findOne({ phone_number: decoded.phone_number });
      console.log(user);
      res.json({
        message: "Xác thực thành công",
        user: {
          name: user.user_name,
          phone_number: user.phone_number,
          email: user.email,
          is_admin: user.is_admin,
        },
      });
    });
  }

  async editprofile(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    let decodedData;
    jwt.verify(token, "DACNTT2", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }
      decodedData = decoded;
    });
    const authenUser = await User.findOneAndUpdate(
      { phone_number: decodedData.phone_number },
      { email: req.body.email, user_name: req.body.user_name }
    );
    if (!authenUser) {
      return res.status(500).json({ message: "Không tìm thấy người dùng" });
    }
    const newToken = jwt.sign(
      {
        id: authenUser._id,
        is_admin: authenUser.is_admin,
        is_shipper: authenUser.is_shipper,
        name: authenUser.user_name,
        phone_number: authenUser.phone_number,
        email: authenUser.email,
      },
      "DACNTT2",
      { expiresIn: "5d" }
    );
    res.status(200).json({ message: "update thành công", token: newToken });
  }
}

module.exports = new UserController();
