const mongoose= require ('mongoose')

mongoose.connect(
    process.env.DB_LINK,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(()=>console.log('connected to database successfully 🐙'))
    .catch(error=>console.log(error))
    