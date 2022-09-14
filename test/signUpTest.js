const request = require("supertest")
const app = require("../app.js")
const {assert} = require("chai")
// const { userSignUp } = require('../controllers/userController')

describe("POST /auth/signup", () => {
    it("must respond with User already exists...", (done) => {
        request(app)
        .post("/auth/signup")
            .send({
                name: "nameExample",
                lastName: "LastExample",
                photo: "http://pm1.narvii.com/6498/1a02c1a91d34a9a472841d4084095facab2d6fb4_00.jpg",
                country: "World",
                email: "bestpinkoctopus@notanexample.com",
                password: "h31d",
                role: "user",
                from: "example"
            })
        .expect(200)
        .end((err, res)=>{
            if (err) return done(err)
            console.log(res.body.message)
            return done()
        })
    })
    it("must respond with Invalid email", (done) => {
        request(app)
        .post("/auth/signup")
            .send({
                name: "nameExample",
                lastName: "LastExample",
                photo: "http://pm1.narvii.com/6498/1a02c1a91d34a9a472841d4084095facab2d6fb4_00.jpg",
                country: "World",
                email: "bestpinkoctopus.notanexample.com",
                password: "h31d",
                role: "user",
                from: "example"
            })
        .expect(400)
        .end((err, res)=>{
            if (err) return done(err)
            return done()
        })
    })
    it("must respond with invalid password", (done) => {
        request(app)
        .post("/auth/signup")
            .send({
                name: "nameExample",
                lastName: "LastExample",
                photo: "http://pm1.narvii.com/6498/1a02c1a91d34a9a472841d4084095facab2d6fb4_00.jpg",
                country: "World",
                email: "example@notanexample.com",
                password: "a",
                role: "user",
                from: "example"
            })
        .expect(400)
        .end((err, res)=>{
            if (err) return done(err)
            return done()
        })
    })
})