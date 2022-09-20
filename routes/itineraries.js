const express = require('express');
const passport = require('../config/passport');
const router= express.Router();

const { addItinerary,
        getItineraries,
        modifyItinerary,
        removeItinerary,
        likeDislike 
    } = require("../controllers/itineraryController")

router.post('/', addItinerary)
router.patch('/:id', modifyItinerary)
router.delete('/:id', removeItinerary )
router.get('/', getItineraries)
router.patch('/like/:id', passport.authenticate('jwt',{ session: false}), likeDislike)

module.exports = router