const express = require("express");
const router = express.Router();

const {
    saveLocation,
    getLatestLocation,
    getLocations
} = require("../controllers/locationController");

router.post("/location", saveLocation);

router.get("/latest-location", getLatestLocation);

router.get("/locations", getLocations);

module.exports = router;