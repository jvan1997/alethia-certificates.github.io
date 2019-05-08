var http = require('http')
var Busboy = require('busboy')
const pdfjsLib = require('pdfjs-dist')

let deanSig = "12"

http.createServer(function (req, res) {

  if( req.method == "OPTIONS" && req.url == "/check"){
    res.writeHead(200, {"Access-Control-Allow-Origin":"*", "Access-Control-Headers":"accept"})
           
          res.end()
        return
        }
  

    // console.log(req)
    console.log(req.url)
    console.log(req.method)
    var busboy = new Busboy({ headers: req.headers })
    let body = {}
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log(fieldname)
      body[fieldname] = val
    })

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

      body[fieldname] = []

      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        body[fieldname].push(data)
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
        body[fieldname] = Buffer.concat(body[fieldname])
      });
    });



    busboy.on('finish', function() {
      console.log('Done parsing form!');
      console.log(body)

      if( req.method == "POST" && req.url == "/check"){
        if( body.sigid === deanSig){

          if( body.file == "undefined"){
            res.writeHead(400)
              res.end()
            return
          }


          getPDFText(body.file)
            .then((text) => {
              // console.log(`text is ${text}`)

              let strs = text.split("\n")
              // console.log(strs)
              let name = ""
              let major = ""
              let units = ""
              let institution = ""
              let date = ""

              let nameToken = "STUDENT NAME:"
              let majorToken = "MAJOR:"
              let schoolUnits = "SJSU CUM:"
              let institutionToken = "University"
              let dateToken = "DATE PRINTED:"
              let institutionFound = false
              let dateFound = false

              let returnObject = {}

              for (var i = 0; i < strs.length; i++) {
                if( !institutionFound && (/.*university.*/gi).test(strs[i])){
                  institution = strs[i]
                  institutionFound = true
                  returnObject.institution = institution
                }

                if( !dateFound && strs[i].includes(dateToken)){
                  let dateString = strs[i].split(dateToken)[1].trim()
                  dateFound = true
                  date = new Date(dateString)
                  returnObject.date = date.getUTCFullYear()
                }

                if (strs[i].includes(nameToken)) {
                  name = strs[i].split(nameToken)[1].trim()
                  // console.log(name)
                  returnObject.name = name
                }
                if (strs[i].includes(majorToken)) {
                  major = strs[i].split(majorToken)[1].trim()
                  // console.log(major)
                  returnObject.major = major
                }
                if (strs[i].includes(schoolUnits)) {
                  units = strs[i].split(schoolUnits)[1].trim()
                  let totalUnits = units.split(/\s+/)[3]
                  // console.log(totalUnits)
                  returnObject.units = totalUnits
                }

              }
              return returnObject
            })
            .then(result=>{
              // console.log(`result is ${result}`)
              for (const key in result){
                console.log(result[key])
              }
              res.writeHead(200, {'Content-Type': 'text', "Access-Control-Allow-Origin":"*"})
              res.write('Valid deanSig'); //write a response
              res.end()
            })



          
          
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

  /**
     * 
     * @param {*} data Is pdf read as data url
     */
    async function getPDFText(data){
      var loadingTask = pdfjsLib.getDocument(data);
      let pdf = await loadingTask.promise
      // console.log(pdf)

      let pdfText = ''

      // console.log(pdf.numPages)
      for(var i=1;i<=pdf.numPages;i++){
          let page = await pdf.getPage(i)
          // console.log(page)
          let textContent = await page.getTextContent()
          // console.log(textContent)

          pdfText = textContent.items.reduce( (acc,curr) => acc + curr.str +"\n", pdfText )
          // for( var j=0; j<textContent.items.length;j++){
          //     pdfText += textContent.items[j].str + "\n"
          // }
      }

      // console.log(pdfText)
      
      return pdfText
  }