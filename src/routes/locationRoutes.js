const express = require("express");
const router = express.Router();

const {
    saveLocation,
    getLatestLocation,
    getLocations
} = require("../controllers/locationController");

router.post("/api/location", saveLocation);
router.get("/api/latest-location", getLatestLocation);
router.get("/api/locations", getLocations);

module.exports = router;