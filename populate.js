require('dotenv').config()
const db = require ('./config/database');
const City = require('./models/City');
const city = require ('./models/City');

//for (let i = o; i < 40; i++){

    City.create({
        "city":"Bangkok",
        "country":"Thailand",
        "photo":"https://imagenes.elpais.com/resizer/pKpsAzeO1aqa2M1a-6AIp_ZbxH0=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/VXSEYFTVUFDGPJH6BZFVCGH6OU.jpg","population": 10.539,
        "fundation": "1782",
        "description":"Bangkok is the capital and most important city in Thailand, with a population of over eight million people. Thanks to its growing economic development and massive popularity as an international tourist destination, it has become one of Southeast Asia's most influential and modern cities."
    })









//}