var http = require('http')
var Busboy = require('busboy')

let deanSig = "12"

http.createServer(function (req, res) {

    console.log(req)
    console.log(req.url)
    console.log(req.method)
    var busboy = new Busboy({ headers: req.headers })
    let body = {}
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log(fieldname)
      body[fieldname] = val
    })
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      console.log(body)

      if( req.method == "POST" && req.url == "/check"){
        if( body.sigid === deanSig){
          res.writeHead(200, {'Content-Type': 'text', "Access-Control-Allow-Origin":"*"})
          res.write('Valid deanSig'); //write a response
          res.end()
          
        }
        else{
          res.writeHead(422, {'Content-Type': 'text', "Access-Control-Allow-Origin":"*"})
          res.write('Invalid deanSig'); //write a response
          res.end()
        }
        return
        
      }
      else{
        res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
      }


    })
    req.pipe(busboy)





  }).listen(8080); //the server object listens on port 8080