const express = require('express');
const router= express.Router();

const { addItinerary,getItineraries } = require("../controllers/itineraryController")

router.post('/', addItinerary)
router.get('/', getItineraries)

module.exports = router