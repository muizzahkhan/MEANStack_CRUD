const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Stores } = require("../models/stores");

router.get("/", (req, res) => {
  Stores.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retrieving Employees : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var store = new Stores({
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    phone: req.body.phone,
  });
  store.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Store save: " + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given ID:  ${req.params.id}`);

  Stores.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in retrieving store: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given ID:  ${req.params.id}`);

  var store = {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    phone: req.body.phone,
  };
  Stores.findByIdAndUpdate(
    req.params.id,
    { $set: store },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in store update: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  Stores.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in store delete: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
