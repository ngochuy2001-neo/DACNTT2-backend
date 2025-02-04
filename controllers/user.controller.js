const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

class UserController {
  async create(req, res) {
    const { email, user_name, phone_number, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!password) {
      return res.status(400).json({ message: "Vui lòng nhập mật khẩu" });
    }

    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { phone_number }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "Người dùng đã tồn tại" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        user_name,
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
        },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      res.status(201).json({ message: "Đăng ký thành công", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  async login(req, res) {
    const { phone_number, password } = req.body;

    if (!phone_number || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    try {
      const user = await User.findOne({ phone_number: phone_number });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Không tìm thấy người dùng này" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Sai mật khẩu" });
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
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Đăng nhập thành công",
        token,
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
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  async authorize(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }

      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        res.json({
          message: "Xác thực thành công",
          user: {
            name: user.user_name,
            phone_number: user.phone_number,
            email: user.email,
            is_admin: user.is_admin,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
      }
    });
  }

  async editProfile(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    let decodedData;
    try {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }

    const { email, user_name } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        decodedData.id,
        { email, user_name },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const newToken = jwt.sign(
        {
          id: updatedUser._id,
          is_admin: updatedUser.is_admin,
          is_shipper: updatedUser.is_shipper,
          name: updatedUser.user_name,
          phone_number: updatedUser.phone_number,
          email: updatedUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      res.status(200).json({ message: "Cập nhật thành công", token: newToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

module.exports = new UserController();
