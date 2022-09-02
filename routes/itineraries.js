const express = require('express');
const router= express.Router();

const { addItinerary, getItineraries, modifyItinerary } = require("../controllers/itineraryController")

router.post('/', addItinerary)
router.patch('/:id', modifyItinerary)
router.get('/', getItineraries)

module.exports = router