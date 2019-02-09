const http = require('http')

let notes = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-1234569",
        "id": 4
      }
]

const app = http.createServer((request, response)=>{
    response.writeHead(200, { 'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})

const port = 3001
app.listen(port)
console.log(`server running on port ${port}`)
