const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')



app.use(cors())
morgan.token('body', function(req,res){return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-1234569",
        id: 4
      }
]

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

app.get('/api/persons', (reqm, res) =>{
    res.json(persons)
})
app.get('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id);

    response.status(204).end()
})



app.post('/api/persons', (request,response) =>{
    const body = request.body
    if(body.name === undefined || body.number === undefined){
        return response.status(400).json({
            error: 'Name and/or number missing'
        })
    }


    const onLuettelossa = persons.find(person => person.name === body.name)


    if(!onLuettelossa){
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*Math.floor(100000)),
    }
    
    persons = persons.concat(person)

    response.json(person)
}else{
    return response.status(400).json({
        error: 'Person already exists'

    })
}
})





const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})