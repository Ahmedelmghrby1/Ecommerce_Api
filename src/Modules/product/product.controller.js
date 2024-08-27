// import slugify from "slugify";
import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Product } from "../../../Database/Models/product.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

// add category
const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = new Product(req.body);
  await product.save();
  res.status(200).json({ message: "Product added successfully", product });
});
// all Product
const allProduct = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagination()
    .sort()
    .fields()
    .filter()
    .search();
  let product = await apiFeatures.mongooseQuery;
  res
    .status(200)
    .json({ message: "success", page: apiFeatures.pageNumber, product });
});

// get Product
const getProduct = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "success", product });
});
// update Product
const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imageCover)req.body.imageCover = req.files.imageCover[0].filename;
  if (req.files.images) req.body.images = req.files.images.map((img) => img.filename);
  
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "success", product });
});
// delete Product
const deleteProduct = deleteOne(Product);

export { addProduct, allProduct, getProduct, updateProduct, deleteProduct };
