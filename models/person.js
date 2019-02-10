const mongoose = require ('mongoose')


mongoose.set('useFindAndModify', false)


const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, {useNewUrlParser: true})
.then(result =>{
    console.log('connected')

})
.catch((error) =>{
    console.log('error')
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


personSchema.set('toJSON', {
    transform: (doc,ret) =>{
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)