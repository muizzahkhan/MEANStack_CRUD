const mongoose = require("mongoose");

var Stores = mongoose.model("Stores", {
  name: { type: String },
  type: { type: String },
  city: { type: String },
  phone: { type: Number },
});

module.exports = { Stores };
