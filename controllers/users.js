import userModel from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  checkUserByEmail,
  createUser,
  verifyUser,
  changePassword,
  deleteUserbyId,
  updateUserMode
} from "../services/user.js";
import {getUserDetails} from "../services/user.js"
import {insertGamePoint} from '../services/gamepoint.js'
import { sendMail } from "../utils/sendemail.js";

export const signup = async (req, res) => {
  // console.log('req.body', req.body)
  try {
    const { email, password, confirmpassword } = req.body;
    // console.log('req.body', req.body)
    const existingUser = await checkUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords does not match" });
    }

    const result = await createUser(req);
    const points = 0
    const updatepoint = await insertGamePoint( {user:result, points} )
    // console.log(updatepoint)
    const mailstatus = await sendMail(
      "verification code send",
      "your email verification code is = " + result.verificationcode,
      result.email
    );
    // console.log(result)
    if (!mailstatus) {
      console.log(await deleteUserbyId(result._id))
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json({
        message:
          "activation email is sended to your email please check your email",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userVerification = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    // console.log("req.body", req.body);
    const existingUser = await checkUserByEmail(email);

    if (!existingUser) {
      return res.status(400).json({ message: "User is not exists." });
    }
    if (existingUser.verificationcode == verificationCode) {
      const verifyuser = await verifyUser(email);

      res.status(200).json({ result: `${verifyuser.name} is verified` });
    } else {
      res.status(400).json({ message: "verification code is not valid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await checkUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: "User is not exists." });
    }

    if (existingUser.active == false) {
      return res.status(400).json({ message: "User is not verified." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    // // console.log("test");

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.userrole,
      },
      process.env.JWTPHRASE
    );

    res
      .status(200)
      .json({ message: "success", userObj: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const changeUserPassword = async (req, res) => {
  const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const existingUser = await checkUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: "User is not exists." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Old password is not matched" });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password does not match" });
    }

    const user = await changePassword(email, newPassword);
    res.status(200).json({ message: "password changed", result: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (users) {
      res.status(200).json({ message: "users is returned", data: users });
    } else {
      res.status(400).json({ message: "tset" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const setUserPlayMode = async (req, res) => {
  try {
    // console.log(req.userId)
    const userid = req.userId
    const {mode} = req.body
    const userdetail = await getUserDetails(userid);
    // console.log(mode)
    // console.log(userdetail)
    if(!userdetail){
      res.status(500).json({ message: "users is not exists"});
    }

    const updatemode = await updateUserMode(userid,mode);

    if (updatemode) {
      res.status(200).json({ message: "User is playmode is updated"});
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};