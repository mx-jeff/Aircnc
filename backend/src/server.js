const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const port = 3333
const dbPassword = "Aircnc"
const dbName = "Aircnc"
const database = `mongodb+srv://Aircnc:${dbPassword}@aircnc-wns3j.mongodb.net/${dbName}?retryWrites=true&w=majority`
const app = express()

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

if(mongoose.connect){
    console.log('Banco conectado!')
}

app.use(cors(/*{ origin: http://localhost:3333 }*/))
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..','images')))
app.use(routes)
console.log(`Listening on port ${port}`)

app.listen(port)

/*  API Rest, GET=buscar, POST=criar, PUT=editar ,DELETE=deletar, 
*   request.query = Acessar params
*   request.params = Acessar paramêtros para edição e deletar
*   request.body = Acessar corpo(conteudo) da requisição, criação, edição, etc...
*   portquiz.net:PORT
*/