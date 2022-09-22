const express = require('express');
const passport = require('../config/passport');
const router= express.Router();

const { addItinerary,
        getItineraries,
        modifyItinerary,
        removeItinerary,
        likeDislike,
        getItineraryByUser 
    } = require("../controllers/itineraryController")

router.post('/',passport.authenticate('jwt',{ session: false}), addItinerary)
router.patch('/:id',passport.authenticate('jwt',{ session: false}), modifyItinerary)
router.delete('/:id',passport.authenticate('jwt',{ session: false}), removeItinerary )
router.get('/', getItineraries)
router.get('/auth', passport.authenticate('jwt',{ session: false}), getItineraryByUser)
router.patch('/like/:id', passport.authenticate('jwt',{ session: false}), likeDislike)

module.exports = router