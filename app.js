const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Hello from Express!');
    console.log('/');
})

app.post('/', (request, response) => {
    response.send('Hello from Express!');
    // console.log(request);
    // console.log(response);
    // console.log('/');
    console.log(`${request.body.imAlive} on ${moment().format('YYYY-MMMM-DD HH:mm:ss ZZ')}`);
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
})