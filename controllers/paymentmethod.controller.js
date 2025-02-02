const PaymentMethod = require("../models/paymentmethod.model");

class PaymentMethodController {
  async create(req, res) {
    try {
      const paymentmethod = new PaymentMethod(req.body);
      const savedPaymentMethod = await paymentmethod.save();
      res.json(savedPaymentMethod);
    } catch (error) {
      console.log(error);
    }
  }

  async show(req, res) {
    try {
      const allPaymentMethod = await PaymentMethod.find();
      console.log(allPaymentMethod);
      res.json(allPaymentMethod);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete();
      if (!deletedPaymentMethod) {
        return res.status(404).json({ message: "Payment method not found!" });
      }
      res.status(200).json(deletedPaymentMethod);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PaymentMethodController();
