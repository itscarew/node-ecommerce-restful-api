const Product = require("../models/product.models");
const { sex, category } = require("../product-filter/product-filter");

exports.products_get_all_products = (req, res) => {
  Product.find()
    .exec()
    .then((product) => {
      res.status(200).json({ products: product });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.products_create_product = (req, res) => {
  const product = new Product({
    name: req.body.name,
    productImage: req.file.path,
    category: req.body.category,
    sex: req.body.sex,
    price: req.body.price,
  });

  return product
    .save()
    .then((product) => {
      res.status(201).json({
        message: "Product created",
        product,
      });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.products_get_a_product = (req, res) => {
  const { productsId } = req.params;
  Product.findOne({ _id: productsId })
    .exec()
    .then((product) => {
      if (!product) {
        res.status(404).json({
          err: "Product does not exist",
        });
      } else {
        res.status(200).json({
          message: "Product found",
          product,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.products_get_products_by_category = (req, res) => {
  const { filter } = req.params;
  const { TROUSER, SHIRT, SPECS, NONE } = category;
  Product.find({ category: filter })
    .exec()
    .then((product) => {
      filter === SHIRT ||
      filter === TROUSER ||
      filter === SPECS ||
      filter === NONE
        ? res.status(200).json({
            message: `All Products for ${filter}`,
            products: product,
          })
        : res
            .status(404)
            .json({ err: `Category '${filter.toUpperCase()}' does not exist` });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.products_get_products_by_sex = (req, res) => {
  const { filter } = req.params;
  const { MEN, WOMEN, UNISEX } = sex;
  Product.find({ sex: filter })
    .exec()
    .then((product) => {
      filter === MEN || filter === WOMEN || filter === UNISEX
        ? res.status(200).json({
            message: `All Products for ${filter}`,
            products: product,
          })
        : res
            .status(404)
            .json({ err: `Category '${filter.toUpperCase()}' does not exist` });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.products_update_details_of_product = (req, res) => {
  const { productsId } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: productsId }, { $set: updateOps })
    .exec()
    .then((product) => {
      res.status(200).json({
        message: "Product details updated successfully",
        product,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err,
      });
    });
};

exports.products_delete_any_product = (req, res) => {
  const { productsId } = req.params;
  Product.deleteOne({ _id: productsId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Products Deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};
