const express = require('express');
const router= express.Router();

const {addCity,getOneCity,getCities,modifyCity,removeCity} = require ('../controllers/cityController');

router.post('/',addCity)
router.get('/:id',getOneCity)
router.get('/',getCities)
router.put('/:id',modifyCity)
router.delete('/:id',removeCity)

module.exports = router;
