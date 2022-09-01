require('dotenv').config()
const db = require ('./config/database');
const City = require('./models/City');

//for (let i = o; i < 40; i++){

    City.create(
    {
    "city":"London", 
    "country":"United Kingdom",
    "photo":"https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
    "population": 9002488,
    "fundation": 470,
    "description":"London is a city with many layers of history, where the medieval and the Victorian complement a rich and modern world. The Tower of London and Westminster are surrounded by local pubs and markets, and ancient rituals like the changing of the guard can be seen as locals rush to catch the tube. It is a place where travelers can transition from one era to another through the city and, when they are tired, they can do as Londoners do and have a cup of tea. ☕"
    });
    
    City.create({
        "city":"Ibiza",
        "country":"Spain",
        "photo":"https://images2.alphacoders.com/263/thumb-1920-263832.jpg",
        "population": 400000,
        "fundation": 1278,
        "description":"Ibiza is often referred to as the “white island” and “party capital of the world” - a neat pair of monikers to describe the difference between day and night in this beautiful Spanish paradise. Ibiza is home to more than 60 beaches that attract visitors from all over the globe, and boasts some of the world’s best nightclubs, which keep partiers entertained from sundown until dawn."
    })
    
    City.create({
        "city":"Dubai",
        "country":"United Arab Emirates",
        "photo":"https://image.winudf.com/v2/image/Y29tLmhkd2FsbHBhcGVyLmR1YmFpaGR3YWxscGFwZXJzX3NjcmVlbl8wXzh0dnNjbjdu/screen-0.jpg?fakeurl=1&type=.jpg",
        "population": 3515813,
        "fundation": 1833,
        "description":"Indulgent, glamorous, and progressive are words that describe Dubai. This United Arab Emirates city is a luxury travel destination for leisure and business travellers. Dubai combines a modern metropolis with a timeless sensibility and Arabian flair"
    })
    
    City.create({
        "city":"Venice",
        "country":"Italy",
        "photo":"https://sportvac.com/wp-content/uploads/2021/08/115103-scaled.jpg",
        "population": 25868500,
        "fundation": 1233,
        "description":"Venice is unique environmentally, architecturally, and historically, and in its days as a republic the city was styled la serenissima (“the most serene” or “sublime”). It remains a major Italian port in the northern Adriatic Sea and is one of the world's oldest tourist and cultural centres."
    })
    
    City.create({
        "city":"Sidney",
        "country":"Australia",
        "photo":"https://www.10wallpaper.com/wallpaper/1366x768/1501/Sydney_Night_City-Photography_HD_wallpapers_1366x768.jpg",
        "population": 5231147,
        "fundation": 1788,
        "description":"Sydney, the capital of New South Wales, Australia. It is Australia's oldest and largest city with a population of around 4 million. Sydney is built around a huge harbour and hosts many tourist attractions as well as a number of beaches, bays and a couple of national parks."
    })
    
    City.create({
        "city":"Las Vegas",
        "country":"United States of America",
        "photo":"https://images7.alphacoders.com/458/thumb-1920-458532.jpg",
        "population": 641903000,
        "fundation": 1905,
        "description":"Las Vegas is a large sprawling glitzy city situated in the middle of the high desert surrounded by stark high desert mountains. Words such as surreal, fast-paced and hyper-reality quickly come to mind when describing Las Vegas. Words such as subtle and quiet are not often associated with this city."
    })
    
    City.create({
        "city":"Rio de Janeiro",
        "country":"Brazil",
        "photo":"https://images6.alphacoders.com/711/thumb-1920-711134.jpg",
        "population": 6748020,
        "fundation": 1565,
        "description":"Known to Brazilians as 'Cidade Maravilhosa' (The Wonderful City), Rio de Janeiro is always brimming with color, sound, rhythm, and joy, which make it synonymous with Carnival, happiness, and beautiful people. Very few places in the world match the hospitality and natural charm in which Rio is perpetually swathed."
    })
    
    City.create({
        "city":"Osaka",
        "country":"Japan",
        "photo":"https://gaijinpot.scdn3.secure.raxcdn.com/wp-content/uploads/sites/6/2016/02/Osaka.jpg",
        "population": 2753862,
        "fundation": 1889 ,
        "description":"Osaka is best known for its amazing casual food and outgoing locals. It's arguably Japan's street food capital, and most famous for snacks including takoyaki and okonomiyaki. Osaka is also renowned for its fun, extroverted people who make eating and drinking in the city an unforgettable experience."
    })
    
    City.create({
        "city":"Cape Town",
        "country":"South Africa",
        "photo":"https://images6.alphacoders.com/441/thumb-1920-441888.jpg",
        "population": 4710000,
        "fundation": 1652,
        "description":"Known as the “Mother City”, Cape Town is the oldest city in South Africa. Perched between the ocean and the mountain, with a national park as its heart, there is nowhere like Cape Town. Cape Town, the “Mother City”, is the oldest city in South Africa and has a cultural heritage spanning more than 300 years."
    })
    
    City.create({
        "city":"Mexico City",
        "country":"Mexico",
        "photo":"https://img5.goodfon.com/wallpaper/nbig/6/60/mekhiko-meksika-zdaniia-ploshchad.jpg",
        "population": 885500,
        "fundation": 1521,
        "description":"Built on the ruins of the ancient Aztec city of Tenochtitlan, Mexico City is one of the oldest and largest cities in the Americas. Colonial architecture, iconic artwork, spicy cuisine, and a rich cultural heritage offer visitors an endless array of activities that will satisfy any appetite."
    })
    
    City.create({
        "city":"Amsterdam",
        "country":"Netherlands",
        "photo":"https://wallpaperboat.com/wp-content/uploads/2019/12/amsterdam-01.jpg",
        "population": 82175200,
        "fundation": 1275,
        "description":"Amsterdam is one of the greatest small cities in the world. From Amsterdam canals to world-famous Amsterdam museums and historical Amsterdam sights, it is one of the most romantic and beautiful cities in Europe. Canal cruises are a popular way to see the city from the perspective of its canals. "
        })
    City.create({
            "city":"Bangkok",
            "country":"Thailand",
            "photo":"https://imagenes.elpais.com/resizer/pKpsAzeO1aqa2M1a-6AIp_ZbxH0=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/VXSEYFTVUFDGPJH6BZFVCGH6OU.jpg",
            "population": 1053900,
            "fundation": 178200,
            "description":"Bangkok is the capital and most important city in Thailand, with a population of over eight million people. Thanks to its growing economic development and massive popularity as an international tourist destination, it has become one of Southeast Asia's most influential and modern cities."
        })





//}