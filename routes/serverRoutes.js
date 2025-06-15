const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAllServers,
  getServersByRegion,
  searchServers,
  addServer,
  uploadCSV
} = require("../controllers/serverController");

router.get("/", getAllServers);
router.get("/region/:region", getServersByRegion);
router.get("/search/:query", searchServers);
router.post("/add", addServer);
router.post("/upload", upload.single("file"), uploadCSV);

module.exports = router;
