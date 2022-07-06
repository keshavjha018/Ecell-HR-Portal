// Routes for auth

//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const Auth = require("../controllers/auth.controller");

//---------------------------------------------INSTANCE---------------------------------------------
let authRouter = new express.Router();
let auth = new Auth();

authRouter.put('/mailverification/:userId/:token',async(req,res) =>{auth.emailVerification(req,res)});                               //verify email & activate User Acc.
authRouter.post('/userlogin',async(req,res) =>{auth.UserLogin(req,res)});                                                                       //
authRouter.get('/logout',async(req,res) =>{auth.Logout(req,res)});                                                                       //
// authRouter.post('/admin/login',async(req,res) =>{auth.AdminLogin(req,res)});                                                                       //
// authRouter.put('/mailoptions/resetpassword/:userId/:token',async(req,res) =>{auth.resetPassword(req,res)});      //verify email & reset password



module.exports = authRouter;