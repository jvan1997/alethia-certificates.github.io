var http = require('http')
var Busboy = require('busboy')
const pdfjsLib = require('pdfjs-dist')

let deanSig = "12"

http.createServer(function (req, res) {
  // Handle CORS pre-flight
  if( req.method == "OPTIONS" && req.url == "/check"){
    res.writeHead(200, {"Access-Control-Allow-Origin":"*", "Access-Control-Headers":"accept"})
           
          res.end()
        return
        }

    // Process submitted data
    var busboy = new Busboy({ headers: req.headers })
    let body = {}
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
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

      // Verify that submitted deanSig is correct
      if( req.method == "POST" && req.url == "/check"){
        if( body.sigid === deanSig){

          if( typeof(body.file) == "undefined"){
            res.writeHead(200, {'Content-Type': 'text', "Access-Control-Allow-Origin":"*"})
              res.write('Valid deanSig'); 
              res.end()
            return
          }

          // Process pdf file
          getPDFText(body.file)
            .then((text) => {

              let strs = text.split("\n")
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
                  returnObject.name = name
                }
                if (strs[i].includes(majorToken)) {
                  major = strs[i].split(majorToken)[1].trim()
                  returnObject.major = major
                }
                if (strs[i].includes(schoolUnits)) {
                  units = strs[i].split(schoolUnits)[1].trim()
                  let totalUnits = units.split(/\s+/)[3]
                  returnObject.units = totalUnits
                }

              }
              return returnObject
            })
            .then(result=>{
              for (const key in result){
                console.log(result[key])
              }
              res.writeHead(200, {'Content-Type': 'text', "Access-Control-Allow-Origin":"*"})
              res.write('Valid deanSig'); 
              res.end()
            })



          
          
        }
        else{
          res.writeHead(422, {'Content-Type': 'text', "Access-Control-Allow-Origin":"*"})
          res.write('Invalid deanSig');
          res.end()
        }
        return
        
      }
      else{
        res.end(); 
      }


    })
    req.pipe(busboy)





  }).listen(8080); //the server object listens on port 8080

  /**
     * Read submitted pdf file
     * @param {*} data Is pdf read as data url
     */
    async function getPDFText(data){
      var loadingTask = pdfjsLib.getDocument(data);
      let pdf = await loadingTask.promise

      let pdfText = ''

      for(var i=1;i<=pdf.numPages;i++){
          let page = await pdf.getPage(i)
          let textContent = await page.getTextContent()

          pdfText = textContent.items.reduce( (acc,curr) => acc + curr.str +"\n", pdfText )

      }

      
      return pdfText
  }