// Routes for auth

//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const Auth = require("../controllers/auth.controller");
// const authUser = require("../../middlewares/authenticate");

//---------------------------------------------INSTANCE---------------------------------------------
let authRouter = new express.Router();
let auth = new Auth();

authRouter.put('/mailverification',async(req,res) =>{auth.emailVerification(req,res)});                               //verify email & activate User Acc.
authRouter.post('/userlogin',async(req,res) =>{auth.UserLogin(req,res)});                                                                       //
authRouter.get('/logout',async(req,res) =>{auth.Logout(req,res)});                                                                       //
// authRouter.get("/getuser", authUser,  async(req,res) =>{req.user ? res.send(req.user) : res.status(404).send({message:"Error"})})
// authRouter.post('/admin/login',async(req,res) =>{auth.AdminLogin(req,res)});                                                                       //
// authRouter.put('/mailoptions/resetpassword/:userId/:token',async(req,res) =>{auth.resetPassword(req,res)});      //verify email & reset password



module.exports = authRouter;