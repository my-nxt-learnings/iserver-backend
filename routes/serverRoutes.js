const express = require("express");
const router = express.Router();
const {
  getAllServers,
  getServersByRegion,
  searchServers,
  addServer
} = require("../controllers/serverController");

router.get("/", getAllServers);
router.get("/region/:region", getServersByRegion);
router.get("/search/:query", searchServers);
router.post("/add", addServer);

module.exports = router;
