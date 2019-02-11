
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')




app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('body', function(req,res){return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/', (req, res)=> {
    res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) =>{
    
    paiva = new Date();
    const pituus = persons.length
    const vyohyke = paiva.toUTCString()
    res.send(`<p>Puhelinluettelossa on ${pituus} henkilön tiedot </p>
    ${vyohyke}`)
    

    
})

app.get('/api/persons', (request, response) =>{
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})
app.get('/api/persons/:id', (request, response) =>{
    Person.findById(request.params.id).then(person =>{
        response.json(person.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) =>{
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request,response) =>{
    const body = request.body
    if(body.name === undefined || body.number === undefined){
        return response.status(400).json({
            error: 'Name and/or number missing'
        })
    }
   
    const person = new Person({
        name: body.name,
        number: body.number,
        
    })
    
    person.save().then(savedPerson =>{
        response.json(savedPerson.toJSON())
    })

})

app.put('/api/persons/:id', (request, response, next) => {

    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id,person, {new: true})
    .then(updatedPerson =>{
        response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))

})

const unknownEndpoint = (request, response) =>{
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) =>{
    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).send({error: 'malformated id'})
    }
    next(error)
}

app.use(errorHandler)




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})