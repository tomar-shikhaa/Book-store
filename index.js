const express = require("express")
const mongoose = require("mongoose")
const book = require("./route/BookRoute")
const slider = require("./route/SliderRoute")
const Category = require("./route/CategoryRoute")
const User = require("./route/UserRoute")
const {connectDB} = require("./config/DB")
const {i18n} = require("./middleware/Localization")

const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(i18n.init)
app.use("/", book, slider, Category,  User)

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is started at ${PORT}`);
})


