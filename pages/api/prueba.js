
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
const AdmZip = require('adm-zip');
const {spawn} = require('child_process');


export const config = {
  api: {
    bodyParser: false,
  },
};

async function SaveRaR(req) {
  let File = null
  let Name = ""

  await new formidable.IncomingForm().parse(req)
  .on('file', function(name, file) {
       
    
    Name =  file.filepath.split("\\")[file.filepath.split("\\").length - 1]
    
      fs.copyFile(file.filepath, `E:/paginas web/resolucion_202/public/files/${req.query.sede}/${req.query.fn}`, function (err) {
        if (err) {
          fs.mkdirSync(`./public/files/${req.query.sede}`, { recursive: true });
          fs.copyFile(file.filepath, `E:/paginas web/resolucion_202/public/files/${req.query.sede}/${req.query.fn}`, function (err){
            if (err) {
              throw err;
            }
          })
        }
      })

      
      //fs.createWriteStream('./public/files/SUESCA/prueba.rar').write(file.PersistentFile);

  })
  .on('field', function(name, field) {
      
  })
  .on('error', function(err) {
      throw (err);
  })
  .on('end', function() {
    
  });
  return Name;
}

function PythonScript() {
  

  console.log("pueba");

  const python = spawn('python', ['script1.py']);

  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
    });

    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      
      console.log(dataToSend);

      });
  
}
export default async function handler(req, res) {

  const file_path= await SaveRaR(req)

  
  res.status(200).json("Archivo subido correctamente")
}
