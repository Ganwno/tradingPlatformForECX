const { Product, validate } = require("../model/productModel");
const { User } = require("../model/userModel");
const WareHouse = require("../model/warehouseModel");

const addProduct = async (req, res) => {
  const {
    productName,
    productQuantity,
    warehouse,
    productType,
    grade,
    seller,
    productDate,
  } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const findUser = await User.findOne({ email: seller });
  if (!findUser) return res.status(404).send("Seller not found");

  const product = new Product({
    productName,
    productQuantity,
    warehouse,
    productType,
    grade: grade ? grade : 1,
    seller: findUser._id,
    productDate,
  });

  const item = await product.save();
  const wareHouseProduct = {
    productQuantity,
    product: product._id,
    owner: product.seller,
    inSale: false,
  };

  const newwareHouse = new WareHouse(wareHouseProduct);
  const saveWareHouse = await newwareHouse.save();

  if (!item) return res.status(400).send("Error Occured,Please try again");
  else {
    if (saveWareHouse) return res.send("Product registered successfully");
    return res.status(400).send("Error Occured,Please try again");
  }
};

const getAllProduct = async (req, res) => {
  const product = await Product.find()
    .populate("warehouse")
    .populate("seller", "-__v -date -password")
    .select("-__v -date");
  if (!product.length) return res.status(400).send("No product found");
  return res.send(product);
};

const getMyProduct = async (req, res) => {
  const { id } = req.user;
  const product = await Product.find({ seller: id })
    .populate("warehouse")
    .populate("seller", "-password -__v -date")
    .select("-__v -date");
  if (!product.length) return res.status(400).send("No product found");
  return res.send(product);
};

const getSpecificProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("seller", "-password -__v")
    .select("-__v");
  if (!product) return res.status(400).send("No product found");
  return res.send(product);
};

module.exports = {
  addProduct,
  getAllProduct,
  getMyProduct,
  getSpecificProduct,
};
