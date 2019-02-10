const mongoose = require('mongoose')

if ( process.argv.length<3 ){
    console.log('anna salasana')
    process.exit(1)

}



const password = process.argv[2]

const url = 
`mongodb+srv://fsOsa3:${password}@cluster0-w6svc.gcp.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true})




const personSchema = new mongoose.Schema({

    name: String,
    number: String,
    
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length < 4){

Person.find({}).then(result =>{
    result.forEach(person => {
        console.log(person)
    });
    mongoose.connection.close();

})
}else{

    
const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

person.save().then(response => {
    console.log(`lisätääm ${process.argv[3]} numero ${process.argv[4]} luetteloon`);
    mongoose.connection.close();
})
}
