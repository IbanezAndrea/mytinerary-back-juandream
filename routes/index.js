var express = require('express');
var router = express.Router();
const citiesRouter= require('./cities');
const userRoutes = require('./users');
const itinerariesRoutes = require('./itineraries')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'index', {title: 'Tu vieja'});
});

router.use('/cities',citiesRouter);
router.use('/auth',userRoutes);
router.use("/itineraries", itinerariesRoutes)

module.exports = router;
