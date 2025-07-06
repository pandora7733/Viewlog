import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");
const adminUser = require("../models/adminUser")
const Layouts = "../views/profile/profile"
const Layouts2 = "../views/profile/profileAdd"

router.get(
    "/profile",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        const data = adminUser.find();
        res.render("layouts/imagePage", {locals, data, layout: Layouts});
    })
);

router.get(
    "/profile/log",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        const data = adminUser.find();
        res.render("layouts/logPage", {locals, data, layout: Layouts})
    })
)

router.get(
    "/profile/media",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        const data = adminUser.find();
        res.render("layouts/mediaPage", {locals, data, layout: Layouts})
    })
)

router.get(
    "/profile/setting/add/",
    asyncHandler(async(req, res) => {
        const locals = {title: "profileAdd"}
        const data = await adminUser.findOne({_id: req.params.id});
        res.render("profile/profileAdd", {locals, data, layout: Layouts2})
    })
)

module.exports = router;