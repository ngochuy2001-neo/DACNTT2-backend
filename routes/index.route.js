const BrandRouter = require("./brand.route");

function route(app) {
  app.use("/brand", BrandRouter);
}

module.exports = route;
