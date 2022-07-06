const express = require("express");
const Complaint = require("./../controllers/complaint.controller");

let complaintRouter = new express.Router();
let complaints = new Complaint();

complaintRouter.post("/:id", async(req,res) => {complaints.create(req,res)});       //Register new Complaint
complaintRouter.get("/:id", async(req,res) => {complaints.get(req,res)});       //Get Registered Complaints
complaintRouter.put("/:id", async(req,res) => {complaints.disable(req,res)});       //Disable the solved complaints

module.exports = complaintRouter;