import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");
const adminUser = require("../models/adminUser")
const Layouts = "../views/profile/profile"
const Layouts2 = "../views/profile/profileAdd"
import upload from "../controllers/upload"; // multer 불러오기

router.get(
    "/profile",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
            herf: "#",
        }
        const data = await adminUser.findOne();
        res.render("layouts/imagePage", {locals, data, layout: Layouts});
    })
);

router.get(
    "/profile/log",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
            herf: "/profile/vlog/add",
        }
        const data = await adminUser.findOne();
        res.render("layouts/logPage", {locals, data, layout: Layouts})
    })
)

router.get(
    "/profile/media",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
            herf: "#",
        }
        const data = await adminUser.findOne();
        res.render("layouts/mediaPage", {locals, data, layout: Layouts})
    })
)

// 프로필 수정 get
router.get(
    "/profile/setting/add/:id",
    asyncHandler(async(req, res) => {
        const locals = {title: "profileAdd"}
        const data = await adminUser.findOne({_id: req.params.id});
        res.render("profile/profileAdd", {locals, data, layout: Layouts2})
    })
)

// 프로필 수정 put
router.put(
  "/profile/setting/add/:id",
  upload.single("profileImage"),  // 업로드 파일 필드 이름
  asyncHandler(async (req, res) => {
    const { username, description } = req.body;

    let updateFields: any = {
      username,
      description,
    };

    // 이미지 업로드가 있는 경우
    if (req.file) {
      updateFields.profileImage = `/media/profileImage/${req.file.filename}`;
    }

    await adminUser.findByIdAndUpdate(req.params.id, updateFields);

    res.redirect("/home/profile");
  })
);

module.exports = router;