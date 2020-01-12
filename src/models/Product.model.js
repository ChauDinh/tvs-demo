import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
