const express = require('express');
const router= express.Router();
const adminPassport = require('../config/adminPassport')

const {addCity,getOneCity,getCities,modifyCity,removeCity} = require ('../controllers/cityController');

router.post('/',adminPassport.authenticate('jwt',{ session: false}),addCity)
router.get('/:id',getOneCity)
router.get('/',getCities)
router.put('/:id',adminPassport.authenticate('jwt',{ session: false}),modifyCity)
router.delete('/:id',removeCity)

module.exports = router;
