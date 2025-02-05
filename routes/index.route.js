const BrandRouter = require("./brand.route");
const CategoryRouter = require("./category.route");
const PaymentMethodRouter = require("./paymentmethod.route");
const UserRouter = require("./user.route");
const AddressRouter = require("./address.route");
const LaptopRouter = require("./laptop.route");

function route(app) {
  app.use("/api/brand", BrandRouter);
  app.use("/api/category", CategoryRouter);
  app.use("/api/paymentmethod", PaymentMethodRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/address", AddressRouter);
  app.use("/api/laptop", LaptopRouter);
}

module.exports = route;
