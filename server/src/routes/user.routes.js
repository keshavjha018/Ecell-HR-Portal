const express = require("express");
const Users = require("./../controllers/user.controller");

let userRouter = new express.Router();
let User = new Users();

userRouter.post("/signup", async(req,res) => {User.signUp(req,res)});       //Register new User
userRouter.get("/:id",async(req,res)=>{User.get(req,res)});                 //get user details

module.exports = userRouter;
