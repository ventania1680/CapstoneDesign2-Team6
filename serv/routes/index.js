const express = require("express");
const router = express.Router();
const fs = require("fs");
const fse = require("fs-extra");
const mime = require("mime");
const { spawn } = require("child_process");
var fileName = "";
// Moment module for retrieving current time
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
// create uploads directory at server startup
fse.ensureDirSync("./uploads");
// Multer Settings
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dir for the uploaded file to be stored
  },
  filename: (req, file, cb) => {
    let uploadTime = moment().format("YYYY-MM-DD_HH-mm-ss");
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    let newFileName = basename + "_" + uploadTime + extension;
    fileName = newFileName;
    cb(null, newFileName); // naming the uploaded file
  },
});
const upload = multer({
  storage: storage,
  // limits file sizes
  limits: {
    fieldSize: 10 * 1024 * 1024, // up to 10MB
  },
  // allow eligible file types only
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(wav|m4a|mp4|mp3|txt|json)$/)) {
      return cb(new Error("Audio or text files only."), false);
    }
    cb(null, true);
  },
});
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "CDP2 Team6" });
});
/* POST upload */
router.post("/", upload.single("upload"), (req, res, next) => {
  let uploadTime = moment().format("YYYY-MM-DD_HH-mm-ss");
  try {
    newFileData = JSON.stringify(req.file);
    console.log(
      "New file has been uploaded:" + "\n" + newFileData + "Time: " + uploadTime
    );
    /* spawn code */
    // spawn new child process to call the STT/TTS engine
    const engine = spawn("java", ["/home/chatbot/Engine", fileName]);
    engine.stdout.on("data", () => {
      console.log("Pipe data from engine script ...");
    });
    // in close event we are sure that stream from child process is closed
    engine.on("close", () => {
      //console.log('child process close all stdio with code ${code}');
      console.log("Engine has finished the job ...");
      let fullFilePath = "./uploads/" + fileName;
      fs.unlink(fullFilePath, (err) => {
        if (err) throw err;
        console.log("Successfully deleted file: " + fileName);
      });
      res.redirect("/download");
    });
  } catch (err) {
    res.send(400);
    console.log("Error occured: file with the wrong format uploaded");
  }
});
router.get("/download", (req, res) => {
  var file = "/home/chatbot/voice/" + fileName;
  mimetype = mime.getType(fileName);
  res.setHeader("Content-disposition", "attachment; filename=" + fileName);
  res.setHeader("Content-type", mimetype);
  var fileStream = fs.createReadStream(file);
  fileStream.pipe(res);
});
module.exports = router;
