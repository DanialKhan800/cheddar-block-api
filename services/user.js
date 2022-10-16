import mongoose from "mongoose";
import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sendSms from "../middleware/twilio.js";

export const checkUserByEmail = async (email) => {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    return false;
  }
};


export const checkUserById = async (userId) => {
  try {
    return await userModel.findOne({ _id:userId });
  } catch (error) {
    return false;
  }
};

export const createUser = async (reqObje) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const { email, password, username, phonenumber } = reqObje.body;
  // const profilepic = process.env.URL + reqObje.file.path;
  try {
    const salt = await bcrypt.genSalt(12)
    const hashpassword = await bcrypt.hash(password.toString(), salt);
    const result = new userModel({
      email: email,
      password: hashpassword,
      name: username,
      active: false,
      verificationcode: verificationCode,
      phonenumber: phonenumber,
      userrole:false,
      dob:Date.now(),
      status:false,
      awardedspin:process.env.AWARDEDSPIN
    });

    return await result.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyUser = async (email) => {
  try {
    return await userModel.findOneAndUpdate(
      { email: email },
      { active: true },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const changePassword = async (email, password) => {
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    return await userModel.findOneAndUpdate(
      { email: email },
      { password: hashpassword },
      { new: true }
    );

  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteUserbyId=async (id) =>{
  try {
    return await userModel.deleteOne({_id: id});
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getUserDetails = async (id)=>{
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return false;
  }
}


export const updateUserMode = async (id,mode)=>{
  try {
    return await userModel.findOneAndUpdate(
      { _id: id },
      { playmode: mode },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}