const request = require("supertest")
const app = require("../app.js")

// describe("POST /auth/signin", ()=>{
    
//     it("Must respond with wrong username or password ❌", (done)=>{
//         request(app)
//             .post('/auth/signin')
//                 .send({
//                     email: "elvio.galeano827@gmail.com",
//                     password : "hola124",
//                     from: "form"
//                     })
//                 .expect(401)
//                 .end((err,res) =>{
//                     console.log(res.body.message)
//                     if (err) return done(err)
//                         return done()
//                 })
//     })

//     it ("Must respond with user signed in", (done)=> { 
//         request(app)
//             .post('/auth/signin')
//                 .send({
//                         email : "elvio.galeano827@gmail.com",
//                         password: "hola123",
//                         from: "form"
//                     })
//                 .expect(200)
//                 .end((err,res) =>{
//                     console.log(res.body.message)
//                     if (err) return done(err)
//                         return done()
//                 })
//             })

// })


// describe("POST /auth/signout", () => {
    
//     it("Must respond with user have successfully signed out!", (done)=>{
//         request(app)
//             .post('/auth/signout')
//                 .send({ 
//                 email : "elvio.galeano827@gmail.com"
//                 })
//                 .expect(200)
//                 .end((err,res) =>{
//                     if (err) return done(err)
//                         console.log(res.body.message)
//                         return done()
//                 })
//     })
// })