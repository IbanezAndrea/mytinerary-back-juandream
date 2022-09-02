const express = require('express');
const router= express.Router();

const { addItinerary } = require("../controllers/itineraryController")

router.post('/', addItinerary)

module.exports = router