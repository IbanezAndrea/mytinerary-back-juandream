const express = require('express');
const router= express.Router();
const passport = require('../config/passport');

const {addCity,getOneCity,getCities,modifyCity,removeCity} = require ('../controllers/cityController');

router.post('/',passport.authenticate('jwt',{ session: false}),addCity)
router.get('/:id',getOneCity)
router.get('/',getCities)
router.put('/:id',passport.authenticate('jwt',{ session: false}),modifyCity)
router.delete('/:id',removeCity)

module.exports = router;
