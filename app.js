const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const $ = require('jsrender');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    //response.send('Hello from Express!');
    myCamera.snap()
    .then((result) => {
        // Your picture was captured
        fs.readFile(`${ __dirname }/test.jpg`, function (err, content) {
            if (err) {
                response.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                response.end("No such image");    
            } else {
                //specify the content type in the response will be an image
                response.writeHead(200,{'Content-type':'image/jpg'});
                response.end(content);
            }
        })
        .catch((error) => {
        // Handle your error
    })});
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
});