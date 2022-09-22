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
                name: "The best of Osaka!!!",
                price: 4,
                description: "Osaka is the compromise between the more progressive Tokyo and the more traditional Kyoto. This ultra-urban metropolis has been a key economic hub for Japan since the 16th century."
            })
            .set({"Authorization": "Bearer " + token})
            .expect(200)
            .then((res) => {
                assert.isObject(res.body.response)
                done()
            })
    })

})