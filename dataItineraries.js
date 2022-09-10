require('dotenv').config()
const db = require ('./config/database');
const itineraries = require('./models/Itinerary')
const activities = require('./models/Activity')

let items= [
    {
    "name":"The Perfect Weekend" ,
    "user":"6312681193f3c2121f38cf56" ,
    "city": "6311302e70a548ffd1ed5d5f",
    "price": "5",
    "likes": ["1"],
    "tags":["VegasBB","Weekend","USA"],
    "duration":"48" ,
    "description": "Oh, the glitz and glamour of spending a long weekend in Las Vegas, with its worldwide fame thanks to its neon signs, legendary casinos, luxury hotels, and fabulous entertainment."
    },
    {
    "name":"EPIC LAS VEGAS" ,
    "user":"6312681193f3c2121f38cf56" ,
    "city": "6311302e70a548ffd1ed5d5f",
    "price": "4",
    "likes": ["1"],
    "tags":["VegasBB","Lovesummer","USA"],
    "duration":"120" ,
    "description": "Summers do reach higher temperatures, but lots of Las Vegas attractions take place inside air-conditioned buildings or outside next to a pool! No matter the season, there’s always something to do in Vegas!"
    },
    {
    "name":"3 Days in Vegas" ,
    "user":"631258d85b6dd57b0bd6a913" ,
    "city": "6311302e70a548ffd1ed5d5f",
    "price": "4",
    "likes": ["1"],
    "tags":["USA","LasVegas","Party"],
    "duration":"72" ,
    "description": "Thanks to this 3 day Las Vegas itinerary, that stress will be alleviated and you will have a great starting point for your trip to Las Vegas."
    },
    {
    "name":"The Perfect 3 Days in Rio de Janeiro" ,
    "user":"6312681193f3c2121f38cf55" ,
    "city": "6311302e70a548ffd1ed5d60",
    "price": "2",
    "likes": ["1"],
    "tags":["RIO", "SouthAmerica", "Brazil"],
    "duration":"72" ,
    "description": "There is no other city in the world like Rio de Janeiro. This amazing city in Brazil is known to have more natural beauty per square inch than any other major city in the world which is really no surprise considering that this huge city is surrounded by both mountains and sea."
    },
    {
    "name":" Isla del sol" ,
    "user":"631258d85b6dd57b0bd6a913" ,
    "city": "6311302e70a548ffd1ed5d60",
    "price": "2",
    "likes": ["1"],
    "tags":["RIO","SouthAmerica", "Brazil"],
    "duration":"8" ,
    "description": "There is no visiting Isla del Sol without stopping at Copacabana, and there is no real point in getting yourself all the way to Copacabana without going out to explore Isla del Sol."
    },
    {
    "name":" A One-Week Rio de Janeiro " ,
    "user":"6312681193f3c2121f38cf55" ,
    "city": "6311302e70a548ffd1ed5d60",
    "price": "4",
    "likes": ["1"],
    "tags":["RIO","SouthAmerica", "Brazil"],
    "duration":"120" ,
    "description": "If you have one week in Rio de Janeiro, you're in for a treat. This gives plenty of time to see all the famous landmarks and scratch the surface to go a little deeper into discovering the city's complex culture "
    },
    {
        "name":" How to spend a week in Sydney " ,
        "user":"6312681193f3c2121f38cf55" ,
        "city": "6311302e70a548ffd1ed5d5e",
        "price": "5",
        "likes": ["1"],
        "tags": ["Travel", "nature"],
        "duration":"120" ,
        "description": "If you have 7 days in Sydney you are in luck, this is the perfect amount of time to get a good feel of the city and all it offers. If you only have three days or so, don't worry, all of these days work independently, so just pick the ones that most appeal and save the rest for your next visit!  "
        },
    {
        "name":"3 Days in Ibiza: The ultimate weekend " ,
        "user":"6312681193f3c2121f38cf56" ,
        "city": "6311302e70a548ffd1ed5d5b",
        "price": "5",
        "likes": ["1"],
        "tags": ["Spain", "Summer" , "Europe"],
        "duration":"72" ,
        "description": "With this itinerary you will get a mix of cultural sites, beautiful beaches, the best gastronomy and a little bit of party time, too! "
        },
    {
        "name": "London Public Buses Audio Tour",
        "user": "6312681193f3c2121f38cf55",
        "city": "6311302e70a548ffd1ed5d5a",
        "price": "3",
        "likes": ["1"],
        "tags": [
            "guided", "tour", "park"
        ],
        "duration": "8",
        "description": "This is not going to be a list of hidden gems, even though London has plenty of those."
    },
    {
        "name": "British Museum Highlights Private Guided Tour",
        "user": "6312681193f3c2121f38cf56",
        "city": "6311302e70a548ffd1ed5d5a",
        "price": "3",
        "likes": ["1"],
        "tags": [
            "museum", "history", "british"
        ],
        "duration": "6",
        "description": "London is one of the world's most famous capital cities and England's largest city, offering an endless number of attractions, museums, historical buildings, and entertainment options. "
    },
    {
        "name": "London Private One Day Tour with a Local",
        "user": "631258d85b6dd57b0bd6a913",
        "city": "6311302e70a548ffd1ed5d5a",
        "price": "4",
        "likes": ["1"],
        "tags": ["tea", "drinks", "food"],
        "duration": "8",
        "description": "As a born and bred Londoner, it can be too easy to take my hometown for granted. Buckingham Palace -been there, done that. London Eye? Literally used to work there. "
    },
    {
        "name": "Nightlife Osaka Food Tour",
        "user": "6312681193f3c2121f38cf55",
        "city": "6311302e70a548ffd1ed5d61",
        "price": "4",
        "likes": ["1"],
        "tags": [
            "nightlife", "beer", "food"
        ],
        "duration": "8",
        "description": "Feast your senses on Osaka — widely acknowledged as Japan's culinary capital — on a 3-hour food tour, ideal for first-time visitors and fans of Japanese cuisine."
    },
    {
        "name": " Osaka's Best and Brightest by Private Vehicle",
        "user": "631258d85b6dd57b0bd6a913",
        "city": "6311302e70a548ffd1ed5d61",
        "price": "4",
        "likes": ["1"],
        "tags": [
            "nightlife", "Asia", "Japan"
        ],
        "duration": "7",
        "description": "This an ideal choice for travelers with limited time in Osaka. Save hours researching where to visit in Osaka, and instead have an action-packed itinerary created for you."
    },
    {
        "name": "Amsterdam Canal Cruise in Classic River Boat With Drinks & Dutch Cheese",
        "user": "631258d85b6dd57b0bd6a913",
        "city": "6311302e70a548ffd1ed5d64",
        "price": "2",
        "likes": ["1"],
        "tags": [
            "canalcruise", "stories", "cheese"
        ],
        "duration": "2",
        "description": "Cruise down the famous canals of Amsterdam during this 60-minute (for travel date before 1 July duration of 75 min) boat tour. Hop aboard the classic wooden saloon boat and sit back and enjoy the beautiful city pass you by. See landmarks while nibbling on Dutch cheese and having a drink."
    },
    {
        "name": "Anne Frank Guided Walking Tour through Amsterdam's Jewish Quarter",
        "user": "631258d85b6dd57b0bd6a913",
        "city": "6311302e70a548ffd1ed5d64",
        "price": "2",
        "likes": ["1"],
        "tags": [
            "informative", "diary", "ww2"
        ],
        "duration": "4",
        "description": "This tour makes it super easy to pack in a little daytime history in between exploring Amsterdam's vibrant nightlife. Even if you're planning on visiting the Anne Frank House separately on your own, this tour follows her path through the city's the Jewish Quarter with a guide who's well brushed up on his WWII history."
    }
]

items.map(e =>{
        itineraries.create({
            "name": e.name ,
            "user": e.user ,
            "city": e.city,
            "price": e.price,
            "likes": e.likes,
            "tags": e.tags,
            "duration": e.duration,
            "description": e.description
        })
    });

///////////////ACTIVITIES///////////////////

let item = [

{
    "name": "Canal Cruise " ,
    "photo": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/44/4d/fc.jpg" ,
    "itinerary": "63197e6c66348574ffa18297",
},

{
    "name": "Osaka Castle" ,
    "photo": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/e6/ec/6d.jpg" ,
    "itinerary": "63197c6be83ec4a4ffab1193",
},

{
    "name": "Osaka Nightlife" ,
    "photo": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/4c/0e/4a/nightlife-osaka-food.jpg?w=800&h=-1&s=1" ,
    "itinerary": "63197c6be83ec4a4ffab1192",
},
{
    "name": "Christ the Redeemer" ,
    "photo": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/f7/55/25/rio-sunset-tour-including.jpg?w=1100&h=-1&s=1" ,
    "itinerary": "631976984f281e2ba3c97c08",
},



]


item.map(e =>{
        activities.create({
            "name": e.name ,
            "photo": e.photo ,
            "itinerary": e.itinerary,
        })
    });
