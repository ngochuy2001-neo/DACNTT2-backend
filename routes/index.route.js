const BrandRouter = require("./brand.route");
const CategoryRouter = require("./category.route");
const PaymentMethodRouter = require("./paymentmethod.route");
const UserRouter = require("./user.route");
const AddressRouter = require("./address.route")

function route(app) {
  app.use("/brand", BrandRouter);
  app.use("/category", CategoryRouter);
  app.use("/paymentmethod", PaymentMethodRouter);
  app.use("/user", UserRouter);
  app.use("/address", AddressRouter)
}

module.exports = route;
