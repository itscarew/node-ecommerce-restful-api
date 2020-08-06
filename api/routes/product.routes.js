const express = require("express");
const router = express.Router();
const multer = require("multer");

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");
const {
  products_get_all_products,
  products_create_product,
  products_get_a_product,
  products_get_products_by_category,
  products_get_products_by_sex,
  products_update_details_of_product,
  products_delete_any_product,
} = require("../controller/product.controller");

//path where the images are going to be stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});

//specify file size and storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

//route to get all products
router.get("/", checkAuth, products_get_all_products);

//route to create a product (admin priviledges)
router.post(
  "/",
  upload.single("productImage"),
  checkAuth,
  checkAdmin,
  products_create_product
);

//route to get a product
router.get("/:productsId", checkAuth, products_get_a_product);

//route to get products by category
router.get("/category/:filter", checkAuth, products_get_products_by_category);

//route to get products by sex/gender
router.get("/sex/:filter", checkAuth, products_get_products_by_sex);

//route to update the details of a product (admin priviledges only)
router.patch(
  "/:productsId",
  checkAuth,
  checkAdmin,
  products_update_details_of_product
);

//route to delete a product (admin priviledges only)
router.delete("/:productsId", checkAuth, checkAdmin, products_delete_any_product);

module.exports = router;
