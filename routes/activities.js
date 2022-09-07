const express = require('express');
const router= express.Router();

const {getActivities,getActivity,createActivity,removeActivity,modifyActivity} = require('../controllers/activitiesController');


router.post('/',createActivity);
router.get('/:id',getActivity);
router.get('/',getActivities);
router.put('/:id',modifyActivity);
router.delete('/:id',removeActivity);

module.exports = router;