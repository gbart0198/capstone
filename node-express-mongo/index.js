const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const userRoutes = require("./routes/user");
const passportJWT = require('./middlewares/userPassportJWT')();
const adminPassportJWT = require('./middlewares/adminPassportJWT')();

const app = express();
let servSetup = {
    origin: "http://localhost:8080"
}

app.use(cors(servSetup));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/capstone', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initalize());
app.use(adminPassportJWT.initalize());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(8000, () => {
    console.log("Listeninig on 8000...");
})