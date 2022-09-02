const express = require('express');
const router= express.Router();

const { addItinerary, getItineraries, modifyItinerary, removeItinerary } = require("../controllers/itineraryController")

router.post('/', addItinerary)
router.patch('/:id', modifyItinerary)
router.delete('/:id', removeItinerary )
router.get('/', getItineraries)

module.exports = router