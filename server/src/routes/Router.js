const express = require("express");

const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
// const complaintRoutes = require("./complaint.route");

//---INSTANCE------
const router = new express.Router();

router.get('/', async(req,res) => {
    res.json({status: "Success"});
});

router.use("/api/user", userRoutes);
router.use("/api/auth", authRoutes);
// router.use("/api/complaint", complaintRoutes);

module.exports = router;

