const request = require("supertest")
const app = require("../app.js")
const {assert} = require("chai")
describe("POST /cities", function () {
    it("Must respond with 201 status code", function (done) {
        request(app)
            .post("/cities")
            .send({
                "city":"Bangkok",
                "country":"Thailand",
                "photo":"https://imagenes.elpais.com/resizer/pKpsAzeO1aqa2M1a-6AIp_ZbxH0=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/VXSEYFTVUFDGPJH6BZFVCGH6OU.jpg",
                "population": 1053900,
                "fundation": 178200,
                "description":"Bangkok is the capital and most important city in Thailand, with a population of over eight million people. Thanks to its growing economic development and massive popularity as an international tourist destination, it has become one of Southeast Asia's most influential and modern cities."
                    })
            .then((res) => {
                assert.isString(res.body.response)
                done()
            })
    })
    it("Must respond with 400 status code", function (done) {
        request(app)
            .post("/cities")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})
describe("GET /cities", () => {
    it("Must respond with 200 status code", function (done) {
        request(app)
            .get("/cities")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})