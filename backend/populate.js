require("dotenv").config();
const connectDB = require("./db/connect");
const product = require("./models/product");
const Product = require("./models/product");

const productsData = require("./products.json");

productsData.forEach((product) => {
         product.createdBy = "Govind"
})

const start = async () => {
      try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(productsData);
        console.log("Success!!!");
        process.exit(0);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
}

start();