const express = require("express");

const userRoutes = require("./user.route");
const complaintRoutes = require("./complaint.route");
// const authRoutes = require("./auth.route");

//---INSTANCE------
const router = new express.Router();

router.get('/', async(req,res) => {
    res.json({status: "Success"});
});

router.use("/api/user", userRoutes);
router.use("/api/complaint", complaintRoutes);
// router.use("/api/auth", authRoutes);

module.exports = router;

