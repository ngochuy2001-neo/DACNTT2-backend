const Address = require("../models/address.model");
const authentication = require("../utils/authentication");

class AddressController {
  async createAddress(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Thiếu token" });

      const user = await authentication(token);

      const { city, district, ward, avenue, specific_address } = req.body;

      const newAddress = new Address({
        user_id: user._id,
        city,
        district,
        ward,
        avenue,
        specific_address,
      });

      await newAddress.save();
      res
        .status(201)
        .json({ message: "Thêm địa chỉ thành công", address: newAddress });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserAddresses(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Thiếu token" });

      const user = await authentication(token);

      const addresses = await Address.find({ user_id: user._id });
      if (addresses.length === 0) {
        return res
          .status(404)
          .json({ message: "Người dùng chưa có địa chỉ nào" });
      }

      res.json({ addresses });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAddress(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Thiếu token" });

      const user = await authentication(token);

      const updatedData = req.body;
      updatedData.update_at = Date.now();

      const updatedAddress = await Address.findOneAndUpdate(
        { user_id: user._id },
        updatedData,
        { new: true }
      );

      if (!updatedAddress) {
        return res.status(404).json({ message: "Không tìm thấy địa chỉ" });
      }

      res.json({
        message: "Cập nhật địa chỉ thành công",
        address: updatedAddress,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAddress(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Thiếu token" });

      const user = await authentication(token);

      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Thiếu ID địa chỉ" });

      const address = await Address.findOne({ _id: id, user_id: user._id });
      if (!address) {
        return res
          .status(404)
          .json({ message: "Địa chỉ không tồn tại hoặc không thuộc về bạn" });
      }

      await Address.deleteOne({ _id: id });

      res.json({ message: "Xóa địa chỉ thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AddressController();
