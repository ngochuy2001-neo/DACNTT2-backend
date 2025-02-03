const Address = require("../models/address.model");
const authentication = require("../utils/authentication");

class AddressController {
  async createAddress(req, res) {
    const token = req.headers.authorization.split(" ")[1]
    const user = await authentication(token);
    try {
      const { city, district, avenue, specific_address } = req.body;

      const newAddress = new Address({
        user_id: user._id,
        city,
        district,
        avenue,
        specific_address,
      });

      await newAddress.save();
      res.status(201).json({ message: "Thêm địa chỉ thành công", address: newAddress });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserAddresses(req, res) {
    const token = req.headers.authorization.split(" ")[1]
    const user = await authentication(token);
    console.log(user)
    try {
      const addresses = await Address.find({ user_id: user._id });

      if (addresses.length === 0) {
        return res.status(404).json({ message: "Người dùng chưa có địa chỉ nào" });
      }

      res.json({ addresses });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAddress(req, res) {
    const token = req.headers.authorization.split(" ")[1]
    const user = authentication(token);
    try {
      const updatedData = req.body;
      updatedData.update_at = Date.now(); // Cập nhật thời gian

      const updatedAddress = await Address.findByIdAndUpdate({user_id: user._id}, updatedData, { new: true });

      if (!updatedAddress) {
        return res.status(404).json({ message: "Không tìm thấy địa chỉ" });
      }

      res.json({ message: "Cập nhật địa chỉ thành công", address: updatedAddress });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAddress(req, res) {
    const token = req.headers.authorization.split(" ")[1]
    const user = authentication(token);
    try {

      const deletedAddress = await Address.findByIdAndDelete({user_id: user._id});

      if (!deletedAddress) {
        return res.status(404).json({ message: "Không tìm thấy địa chỉ" });
      }

      res.json({ message: "Xóa địa chỉ thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AddressController();
