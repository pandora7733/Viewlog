import dotenv from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
const connectdb = require("./config/db");
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectdb();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(methodOverride("_method"));

app.use("/", require("./routers/logs"));
app.use("/home/", require("./routers/profile"));
app.use("/", require("./routers/contentsAdd"));

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});