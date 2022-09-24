var express = require('express');
var router = express.Router();
const citiesRouter= require('./cities');
const userRoutes = require('./users');
const itinerariesRoutes = require('./itineraries')
const commentsRoutes =require ('./comments')
const activitiesRoutes = require('./activities')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index', {title: 'My Tineraries 🐙'});
});

router.use('/cities',citiesRouter);
router.use('/auth',userRoutes);
router.use("/itineraries", itinerariesRoutes);
router.use("/comments", commentsRoutes);
router.use("/activities", activitiesRoutes);

module.exports = router;
