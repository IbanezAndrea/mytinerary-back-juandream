var express = require('express');
var router = express.Router();
const citiesRouter= require('./cities');
const userRoutes = require('./users');
const itinerariesRoutes = require('./itineraries')
const commentsRoutes =require ('./comments')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index', {title: 'Tu vieja'});
});

router.use('/cities',citiesRouter);
router.use('/auth',userRoutes);
router.use("/itineraries", itinerariesRoutes)
router.use("/comments", commentsRoutes)

module.exports = router;
