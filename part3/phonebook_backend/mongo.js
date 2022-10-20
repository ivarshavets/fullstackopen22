// the file is intended for comand-line use of database
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const personName = process.argv[3]
const personNumber = process.argv[4]

//MongoDB URI generated from MongoDB Atlas
const url = `mongodb+srv://fullstack:${password}@cluster0.fnfgswl.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const saveOrFetchData = () => {
  if (!personName || !personNumber) {
    Person.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(({name, number}) => {
        console.log(name, number)
      })
    })
  } else {
    const person = new Person({
      name: personName,
      number:personNumber
    })
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    return person.save()
  }
}

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    saveOrFetchData()
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
