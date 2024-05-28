const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const {createToken} = require('../utils/Utils')
const bcrypt = require('bcrypt');
require("dotenv").config();
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config();
const  crypto = require('crypto')



// Controller function to register a new user
const registerUser = async (req, res) => {
  try {
    const {Name,Password, Email,  Role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ Email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user instance
    const user = new User({Name,Password:hashedPassword, Email,  Role });

    // Save the user to the database
    await user.save();

    // Create a token
    const token = createToken(user.Email, user.Role);

    res.status(201).json({ token, user, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to login an user
const loginUser = async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ Email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Create a token
      const token = createToken(user.Email, user.Role);
  
      res.status(200).json({ token, user, message: 'User logged in successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


  const SendMail = async (email, otp)=>{
    const transporter = nodemailer.createTransport({
      service: process.env.mail,
      auth:{
        user: process.env.gmail,
        pass: process.env.pass
      }
    });

    const mailGenerator = new Mailgen({
      theme: 'default',
      product:{
        name: "Book store",
        link: "http://localhost:4000",
      }
    });
    const emailTemplate = {
      body:{
        name: `${email}`,
        intro:"You requested to reset your Password. Here is your OTP:",
        action:{
          instructions: "please use the following otl to reset your password",
          button:{
            color: "#DC4D2F",
            text: otp,
          },
        },
        outro: "If you did not request this, please ignore this Email.",
      },
    };
    const emailBody = mailGenerator.generate(emailTemplate);
    return transporter.sendMail({
      from: "st9454869@gmail.com",
      to: email,
      subject: "Reset Password",
      html: emailBody,
    });
    }

    // get all user
    const getallusers = async (req, res)=>{
      try{
        const users = await User.find();
        res.status(200).json({users});
      }catch(err){
        res.status(500).json({error: "not found"})
      }
    };

   
const forgetPassword = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: res.__('forget.error1') });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
    const otpHash = await bcrypt.hash(otp, 10);

    user.otp = otpHash;
    user.expiry = expiry;
    await user.save();

    await SendMail(Email, otp);
    res.json({ message: res.__('forget.message1') });

  } catch (error) {
    console.error("Error handling forgot password request:", error);
    res.status(500).json({ error: res.__('forget.error2') });
  }
};




    const resetPassword = async (req, res) => {
      const { Password, Email, otp } = req.body;
    
      try {
        const user = await User.findOne({ Email });
        if (!user) return res.status(400).json({ error: res.__('reset.error1') });
    
        if (!user.otp || !(await bcrypt.compare(otp, user.otp))) {
          return res.status(400).json({ message: res.__('reset.error3') });
        }
    
        user.Password = await bcrypt.hash(Password, 10);
        await user.save();
    
        return res.status(200).json({ message: res.__('reset.message1') });
      } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ error: res.__('reset.error2') });
      }
    };
    
    
module.exports = {registerUser,loginUser, getallusers,SendMail,resetPassword, forgetPassword};

