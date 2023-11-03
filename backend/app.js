const express = require("express");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const connectDB = require("./db/connect");
const app = express();

require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

//middlewares
app.use(cors({

}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended: false}));


app.get("/",(req,res)=>{
    res.status(200).send("<h1>Server is Live</h1>")
})

//routes
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000 ;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();