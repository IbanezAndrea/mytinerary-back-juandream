const request = require("supertest")
const app = require("../app.js")
const {assert} = require("chai")
let token
describe("POST /auth/signin", ()=>{
    
    it("Must respond with user signed in", (done)=>{
        request(app)
            .post('/auth/signin')
            .send({
                email: "3litte@gmail.com",
                password : "Hola234",
                from: "form"
                })
            .expect(200)
            .then((res) => {
                console.log(res.body.message)
                token = res.body.response.token
                done()
            })
    })

})
describe("PATCH /itineraries/:id", ()=>{
    
    it("Must respond with You have updated an itinerary.", (done)=>{
        request(app)
            .patch('/itineraries/632c98b6ca73ebf7e9bdfe67')
            .send({
                name: "The best of Osaka, the otaku paradise!",
                price: 3,
            })
            .set({"Authorization": "Bearer " + token})
            .expect(200)
            .then((res) => {
                assert.isObject(res.body.response)
                done()
            })
    })

})

describe("GET /itineraries/auth", ()=>{

    it("Must respond with The following itineraries were found.", (done)=>{
            request(app)
                .get('/itineraries/auth')
                .set({"Authorization": "Bearer " + token})
                .expect(200)
                .end((err, res)=>{
                    if (err) return done(err)
                                return done()
                })
        })
})

describe("GET /itineraries/auth", ()=>{

    it("Must respond with The following itineraries were found.", (done)=>{
            request(app)
                .get('/itineraries/auth')
                .expect(401)
                .end((err, res)=>{
                    if (err) return done(err)
                                return done()
                })
        })
})