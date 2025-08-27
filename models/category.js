import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLenght: 50,
      minLenght: 3,
      required: true,
      trim: true,
      unique: true
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
