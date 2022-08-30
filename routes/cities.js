const express = require('express');
const router= express.Router();

const {addCity,getOneCity,getCities,modifyCity,removeCity} = require ('../controllers/cityController');

//const cityController= require('../controllers/cityController');
//const addCity= cityController.addCity;
//create
//const getOneCity=cityController.getOneCity;
//read
//const getCities=cityController.getCities;
//read multiples
//const modifyCity=cityController.modifyCity;
//update
//const removeCity=cityController.removeCity;
//delete


router.post('/',addCity)
router.get('/:id',getOneCity)
router.get('/',getCities)
router.put('/:id',modifyCity)
router.delete('/:id',removeCity)

module.exports = router;
