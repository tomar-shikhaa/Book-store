const express = require("express");
const mongoose = require("mongoose");
const book = require("./route/BookRoute")
const slider = require("./route/SliderRoute")
const {connectDB} = require("./config/DB")
const path = require("path")
const {I18n} = require('i18n')

const app = express();
const PORT = 8000;
app.use(express.json());
connectDB();

const i18n = new I18n({
    locales: ['en', 'hi', 'san'],
    directory: path.join(__dirname , 'translation'),
    defaultLocale: 'hi',
    objectNotation: true
})

app.use(i18n.init)

app.use("/", book, slider)
app.listen(PORT, ()=>{
    console.log(`Server is started at ${PORT}`);
})


