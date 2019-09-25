const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

//middleware: bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true,
}));

const dbPath = 'mongodb+srv://smorg:smorg@cluster0-x4vqd.mongodb.net/test?retryWrites=true'


mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true}).then(

    () => {console.log('SUCCESS') },

    err => { console.log('ERROR', err) }
)

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});