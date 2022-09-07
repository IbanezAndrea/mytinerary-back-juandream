const request = require("supertest")
const app = require("../app.js")
const {assert} = require("chai")


describe("POST/itineraries", ()=>{
    it("Must respond with 201 status code", function(done){
        request(app)
            .post("/itineraries")
            .send({
                "name": "Ports of Call Tours",
                "user": "631258d85b6dd57b0bd6a913",
                "city": "6311302e70a548ffd1ed5d62",
                "price": "3",
                "likes": ["1,2,3"],
                "tags": ["africa","nature","view"],
                "duration": "6"
            })
        .then((res)=>{
                    assert.isString(res.body.response)})
                    done()
        })
        
    it ("Must respond with 200 status code", function(done){
        request(app)
            .get("/itineraries")
            .expect(200)
            .end((err, res)=>{
                if(err) return done(err)
                return done()
            })
        })
        
    // it ("Must respond with 400 status code", function(done){
    //     request(app)
    //         .post("/itineraries")
    //         .send({})
    //         .expect(400)
    //         .end((err, res) => {
    //             if (err) return done(err)
    //             return done()
    //         })
    //     })


    })



